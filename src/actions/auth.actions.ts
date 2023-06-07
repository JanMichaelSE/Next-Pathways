"use server"

import { isUserAuthorized, updateUserTokens } from "@/db/models/users.model";
import { generateAccessToken, generateRefreshToken } from "@/services/auth.service";
import { IResponse } from "@/types";


interface UserInfo {
  email: string;
  password: string;
}

export async function httpLogin(userInfo: UserInfo): Promise<IResponse> {
  const response: IResponse = {
    hasError: false,
    data: null,
    errorMessage: ""
  }

  try {
    const userResponse = await isUserAuthorized(userInfo.email, userInfo.password);
    if ("errorCode" in userResponse) {
      response.hasError = true;
      response.errorMessage = userResponse.errorMessage;
      return response;
    }

    const accessToken = generateAccessToken(userResponse.id);
    const refreshToken = generateRefreshToken(userResponse.id);

    await updateUserTokens(userResponse.id, accessToken, refreshToken);

    response.data = {
      accessToken,
      refreshToken,
      email: userResponse.email,
      role: userResponse.role,
      isApproved: userResponse.isApproved
    };
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error at http login:", error.message);
    }
  }

  return response;
}

export async function httpSignupStudent(): Promise<IResponse> {
  const response: IResponse = {
    hasError: false,
    data: null,
    errorMessage: ""
  }

  try {

  } catch (error) {
    if (error instanceof Error) {
      console.log("Error at http signup student:", error.message);
    }
  }

  return response;
}

export async function httpForgotPassword(email: string): Promise<IResponse> {
  const response: IResponse = {
    hasError: false,
    data: null,
    errorMessage: ""
  }

  try {

  } catch (error) {
    if (error instanceof Error) {
      console.log("Error at http forgot password:", error.message);
    }
  }

  return response;
}
