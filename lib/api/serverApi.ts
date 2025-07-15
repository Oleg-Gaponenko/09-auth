import { User } from "@/types/user";
import axios from "axios";
import { cookies } from "next/headers";

export const getUserProfile = async (): Promise<User> => {
  const cookieStore = await cookies();
  const cookie = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await axios.get<User>("https://notehub-api.goit.study/users/me", {
    headers: {
      Cookie: cookie,
      Accept: "application/json",
    },
    withCredentials: true,
  });

  return response.data;
};