import { buildErrorObject, excludeFields } from "@/utils/db.util";
import { prisma } from "../db";
import crypto from "crypto";
import { getUserIdFromToken } from "@/services/auth.service";


async function findUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser(
  email: string,
  password: string,
  role: string,
  isApproved: boolean
) {
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return buildErrorObject(
        400,
        "Email is already taken, please provide a another email address."
      );
    }

    let salt: string = generateSalt(32);
    let hashedPassword: string = sha512(password, salt);

    const createdUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        passwordSalt: salt,
        role: role,
        isApproved: isApproved,
      },
    });

    return createdUser;
  } catch (error) {
    throw error;
  }
}

async function isUserAuthorized(email: string, password: string) {
  try {
    const user = await findUserByEmail(email);
    if (!user) return buildErrorObject(401, "Provided password is incorrect for this user");

    let hashedPasswordFromRequest = sha512(password, user.passwordSalt);
    if (hashedPasswordFromRequest !== user.password) {
      return buildErrorObject(401, "Provided password is incorrect for this user.");
    }

    if (!user.isApproved) {
      return buildErrorObject(401, "User does not have approval to access the system.");
    }

    return excludeFields(user, "password", "passwordSalt");
  }
  catch (error) {
    throw error;
  }
}

async function getUserTokens(token: string) {
  try {
    const userId = getUserIdFromToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUserTokens(
  userId: string,
  accessToken: string,
  refreshToken: string
) {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });

    return excludeFields(user, "id", "password", "passwordSalt");
  } catch (error) {
    throw error;
  }
}

function generateSalt(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0.16);
}

function sha512(password: string, salt: string) {
  let HMAC = crypto.createHmac("sha256", salt);
  HMAC.update(password);
  let hashedPassword = HMAC.digest("hex");
  return hashedPassword;
}

export {
  findUserByEmail,
  createUser,
  isUserAuthorized,
  getUserTokens,
  updateUserTokens
}
