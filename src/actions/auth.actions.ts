"use server"

import { createStudent } from "@/db/models/students.model";
import { createUser, isUserAuthorized, updateUserTokens } from "@/db/models/users.model";
import { generateAccessToken, generateRefreshToken } from "@/services/auth.service";
import { IResponse, IStudent, IUser, StudentInfo } from "@/types";
import { phoneFormat, titleCase } from "@/utils/formatters.util";


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

export async function httpSignupStudent(studentInfo: StudentInfo): Promise<IResponse> {
  const response: IResponse = {
    hasError: false,
    data: null,
    errorMessage: ""
  }

  try {
    const user: IUser = {
      email: studentInfo.email,
      password: studentInfo.password,
      role: "Student"
    };

    const student: IStudent = {
      name: titleCase(`${studentInfo.firstName}  ${studentInfo.lastName}`),
      phone: phoneFormat(studentInfo.phone),
      gender: titleCase(studentInfo.gender),
      gpa: studentInfo.gpa,
      institution: titleCase(studentInfo.institution),
      fieldOfStudy: titleCase(studentInfo.fieldOfStudy),
    };

    if (
      !user.email ||
      !user.password ||
      !user.role ||
      !student.name ||
      !student.gender ||
      !student.fieldOfStudy ||
      !student.institution
    ) {
      response.errorMessage = "Student is missing required fields for signup.";
      response.hasError = true;
      return response;
    }

    const userResponse = await createUser(user.email, user.password, user.role, true);
    if ("errorCode" in userResponse) {
      response.errorMessage = userResponse.errorMessage;
      response.hasError = true;
      return response;
    }

    const accessToken = generateAccessToken(userResponse.id);
    const refreshToken = generateRefreshToken(userResponse.id);
    await updateUserTokens(userResponse.id, accessToken, refreshToken);

    const studentResponse = await createStudent(userResponse.id, user.email, student);

    response.data = {
      accessToken,
      refreshToken,
      isApproved: true,
      ...studentResponse,
    }
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
