import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note, NoteTag } from '../types/note';

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

const noteHubToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const baseUrl = 'https://notehub-public.goit.study/api';

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${noteHubToken}`,
  },
});

function handleError(error: unknown, errorMessage: string): never {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`${errorMessage}: ${message}`);
  } else {
    throw new Error(errorMessage);
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
    handleError(error, 'Cannot create a note');
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
