import { Note, NoteTag } from '@/types/note';
import { handleError, instance } from '../api/api';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';

interface AuthenticationData {
  email: string;
  password: string;
}

export interface NoteHubResponse {
  notes: Note[];
  totalPages: number;
}

interface NoteHubParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: NoteTag;
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

interface UpdateUserProfile {
  username: string;
  avatar?: string;
}

export async function userRegistration(
  data: AuthenticationData
): Promise<User> {
  try {
    const response: AxiosResponse<User> = await instance.post(
      'auth/register',
      data
    );
    return response.data;
  } catch (error) {
    return handleError(
      error,
      'Oops! Sign up failed. Please check your details and try again.'
    );
  }
}

export async function userLogIn(data: AuthenticationData): Promise<User> {
  try {
    const response: AxiosResponse<User> = await instance.post(
      'auth/login',
      data
    );
    return response.data;
  } catch (error) {
    return handleError(
      error,
      'Oops! Login failed. Please check your email and password and try again.'
    );
  }
}

export async function userLogOut(): Promise<void> {
  try {
    await instance.post('auth/logout');
  } catch (error) {
    return handleError(
      error,
      'Oops! Something went wrong while logging out. Please try again.'
    );
  }
}

export async function fetchNotes({
  search = '',
  page = 1,
  perPage = 12,
  tag,
}: NoteHubParams): Promise<NoteHubResponse> {
  try {
    const params: Record<string, string | number> = {
      page,
      perPage,
    };

    if (search.trim()) {
      params.search = search.trim();
    }

    if (tag) {
      params.tag = tag;
    }

    const response: AxiosResponse<NoteHubResponse> = await instance.get(
      '/notes',
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    return handleError(error, 'Cannot fetch notes');
  }
}

export async function createNote(newNote: CreateNoteParams): Promise<Note> {
  try {
    const response: AxiosResponse<Note> = await instance.post(
      '/notes',
      newNote
    );
    return response.data;
  } catch (error) {
    return handleError(error, 'Cannot create a note');
  }
}

export async function deleteNote(noteId: number): Promise<Note> {
  try {
    const response: AxiosResponse<Note> = await instance.delete(
      `/notes/${noteId}`
    );
    return response.data;
  } catch (error) {
    return handleError(error, 'Cannot delete a note');
  }
}

export async function fetchNoteById(noteId: number): Promise<Note> {
  try {
    const response: AxiosResponse<Note> = await instance.get(
      `/notes/${noteId}`
    );
    return response.data;
  } catch (error) {
    return handleError(error, 'Cannot fetch a note by ID');
  }
}

export async function updateUserProfile (data: UpdateUserProfile): Promise<User> {
  try {
    const response: AxiosResponse<User> = await instance.patch(
      '/users/me',
      data
    );
    return response.data;
  } catch (error) {
    return handleError(error, 'Cannot update your profile! Please try again!');
  }
};