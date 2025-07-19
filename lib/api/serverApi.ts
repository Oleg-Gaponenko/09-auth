import { User } from "@/types/user";
import { cookies } from "next/headers";
import { handleError, serverInstance } from "./api";
import { AxiosResponse } from "axios";
import { CreateNoteParams, NoteHubParams, NoteHubResponse, UpdateUserProfile } from "./clientApi";
import { Note } from "@/types/note";

export const getUserProfile = async (): Promise<User> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

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

export const getUser = async (): Promise<User | null> => {
  const cookieStore = cookies();

  try {
    const { data } = await serverInstance.get<User>("/users/me", {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  } catch (error) {
    return null;
  }
};

export const updateUserProfile = async (data: UpdateUserProfile): Promise<User> => {
  const cookieStore = cookies();
  const cookie = cookieStore.toString();

  try {
    const { data: updatedUser } = await serverInstance.patch('/users/me', data, {
      headers: {
        Cookie: cookie,
      },
    });
    return updatedUser;
  } catch (error) {
    handleError(error, 'Failed to update user');
  }
};

export const getSession = async (): Promise<User | null> => {
  const cookieStore = cookies();

  try {
    const { data } = await serverInstance.get('/auth/session', {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  } catch {
    return null;
  }
};

export const getNotes = async ({
  search = '',
  page = 1,
  perPage = 12,
  tag,
}: NoteHubParams): Promise<NoteHubResponse> => {
  const cookieStore = cookies();
  const cookie = cookieStore.toString();

  try {
    const params = {
      page,
      perPage,
      ...(search && { search }),
      ...(tag && { tag }),
    };

    const { data } = await serverInstance.get('/notes', {
      headers: { Cookie: cookie },
      params,
    });

    return data;
  } catch (error) {
    handleError(error, 'Cannot fetch notes');
  }
};

export const getNoteById = async (noteId: number): Promise<Note> => {
  const cookieStore = cookies();
  const cookie = cookieStore.toString();

  try {
    const { data } = await serverInstance.get(`/notes/${noteId}`, {
      headers: { Cookie: cookie },
    });

    return data;
  } catch (error) {
    handleError(error, 'Cannot fetch note by ID');
  }
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const cookieStore = cookies();
  const cookie = cookieStore.toString();

  try {
    const { data } = await serverInstance.post('/notes', note, {
      headers: {
        Cookie: cookie,
      },
    });

    return data;
  } catch (error) {
    handleError(error, 'Cannot create note (server)');
  }
};
