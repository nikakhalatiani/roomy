import { User } from "@/types/user";
export const user: User = {
  matches: 0, // Will change to read from db
};

export const getUser = async (): Promise<User> => {
  return user;
};

export const clearUser = async (): Promise<User> => {
  return user;
};
