export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  image: string;
  role: string;
}

export interface getAllUserResponse {
  users: User[]; // This is what you actually map over
  total: number;
  skip: number;
  limit: number;
}