import { LoginFormValues, AuthResponse } from "../types/auth.types";

export const loginUser = async (credentials: LoginFormValues): Promise<AuthResponse> => {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials:'omit'
  });

  if (!response.ok) {
    const errorData = await response.json();
    // DummyJSON returns error messages in a 'message' field
    throw new Error(errorData.message || "Invalid credentials");
  }

  return response.json();
};