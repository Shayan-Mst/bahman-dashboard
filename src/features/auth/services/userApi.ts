
import { AddUserInputs, getAllUserResponse } from "../types/user.types";

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

export const addUser = async (userData: AddUserInputs) => {
  const response = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add user!");
  }
  return response.json();
};

export const deleteUser = async (id:number) => {
  const response = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "DELETE",
  
  });
 

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete user!");
  }
  return response.json();
};