import { User } from "@/types/user";
import { cookies } from "next/headers";
import { handleError, serverInstance } from "./api";
import { AxiosResponse } from "axios";

export const getUserProfile = async (): Promise<User> => {
  const cookieStore = await cookies();
  const cookie = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  try {
    const response: AxiosResponse<User> = await serverInstance.get('/users/me', {
      headers: {
        Cookie: cookie,
        Accept: "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
      if (error?.response?.status === 401) {
        throw new Error('Unauthorized');
      }
    handleError(error, 'Cannot get user profile.')
  }
};

// export async function fetchNotesServer({ tag }: { tag?: string }): Promise<NoteHubResponse> {
//   const cookieStore = await cookies();
//   const cookie = cookieStore
//     .getAll()
//     .map(({ name, value }) => `${name}=${value}`)
//     .join('; ');

//   try {
//     const response = await serverInstance.get<NoteHubResponse>(`/notes`, {
//       params: {
//         tag: tag || undefined,
//         page: 1,
//         perPage: 12,
//       },
//       headers: {
//         Cookie: cookie,
//         Accept: 'application/json',
//       },
//       withCredentials: true,
//     });

//     return response.data;
//   } catch (error) {
//     handleError(error, 'Cannot fetch notes');
//   }
// }