import { IErrorResponse } from "@/types";

function excludeFields<T, Key extends keyof T>(record: T, ...keys: Key[]): T {
  for (let key of keys) {
    delete record[key];
  }
  return record;
}

function buildErrorObject(code: number, message: string): IErrorResponse {
  const error: IErrorResponse = {
    errorCode: code,
    errorMessage: message,
  };
  return error;
}

export {
  excludeFields,
  buildErrorObject
}
