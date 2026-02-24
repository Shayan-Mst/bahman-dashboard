
import { getAllUserResponse } from "../types/user.types";

export const getAllUser = async (): Promise<getAllUserResponse> => {
  const response = await fetch("https://dummyjson.com/users?limit=5&skip=27&select=firstName,lastName,email,phone,gender,image,role,birthDate", {
    method: "GET",
    credentials:'omit'
  });

  if (!response.ok) {
    const errorData = await response.json();
    // DummyJSON returns error messages in a 'message' field
    throw new Error(errorData.message || "Users not found!");
  }

  return response.json();
};