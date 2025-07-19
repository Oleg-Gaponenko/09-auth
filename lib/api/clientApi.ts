import { Note, NoteTag } from '@/types/note';
import { User } from '@/types/user';
import { instance } from './api';

interface AuthenticationData {
  email: string;
  password: string;
}

export interface NoteHubResponse {
  notes: Note[];
  totalPages: number;
}

export interface NoteHubParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: NoteTag;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface UpdateUserProfile {
  username: string;
  avatar?: string;
}

export const userRegistration = async (
  data: AuthenticationData
): Promise<User> => {
  try {
    const response = await instance.post('/auth/register', data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        'Oops! Sign up failed. Please check your details and try again.'
    );
  }
};

export const userLogIn = async (data: AuthenticationData): Promise<User> => {
  try {
    const response = await instance.post('/auth/login', data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        'Oops! Login failed. Please check your email and password and try again.'
    );
  }
};

export const userLogOut = async (): Promise<void> => {
  try {
    await instance.post('/auth/logout');
  } catch {
    throw new Error(
      'Oops! Something went wrong while logging out. Please try again.'
    );
  }
};

export const fetchNotes = async ({
  search = '',
  page = 1,
  perPage = 12,
  tag,
}: NoteHubParams): Promise<NoteHubResponse> => {
  try {
    const params = {
      page,
      perPage,
      ...(search && { search }),
      ...(tag && { tag }),
    };
    const response = await instance.get('/notes', { params });
    return response.data;
  } catch {
    throw new Error('Cannot fetch notes');
  }
};

export const createNote = async (
  newNote: CreateNoteParams
): Promise<Note> => {
  try {
    const response = await instance.post('/notes', newNote);
    return response.data;
  } catch {
    throw new Error('Cannot create a note');
  }
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  try {
    const response = await instance.delete(`/notes/${noteId}`);
    return response.data;
  } catch {
    throw new Error('Cannot delete note');
  }
};

export const fetchNoteById = async (noteId: number): Promise<Note> => {
  try {
    const response = await instance.get(`/notes/${noteId}`);
    return response.data;
  } catch {
    throw new Error('Cannot fetch note by ID');
  }
};

export const updateUserProfile = async (
  data: UpdateUserProfile
): Promise<User> => {
  try {
    const response = await instance.patch('/users/me', data);
    return response.data;
  } catch {
    throw new Error('Cannot update profile');
  }
};
