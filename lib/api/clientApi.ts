import { Note, NoteTag } from '@/types/note';
import { User } from '@/types/user';

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

export async function userRegistration(data: AuthenticationData): Promise<User> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Oops! Sign up failed. Please check your details and try again.');
  }

  return response.json();
}

export async function userLogIn(data: AuthenticationData): Promise<User> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Oops! Login failed. Please check your email and password and try again.');
  }

  return response.json();
}

export async function userLogOut(): Promise<void> {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Oops! Something went wrong while logging out. Please try again.');
  }
}

export async function fetchNotes({
  search = '',
  page = 1,
  perPage = 12,
  tag,
}: NoteHubParams): Promise<NoteHubResponse> {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('perPage', String(perPage));
  if (search) params.set('search', search);
  if (tag) params.set('tag', tag);

  const response = await fetch(`/api/notes?${params.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Cannot fetch notes');
  return response.json();
}

export async function createNote(newNote: CreateNoteParams): Promise<Note> {
  const response = await fetch('/api/notes', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newNote),
  });

  if (!response.ok) throw new Error('Cannot create a note');
  return response.json();
}

export async function deleteNote(noteId: number): Promise<Note> {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Cannot delete note');
  return response.json();
}

export async function fetchNoteById(noteId: number): Promise<Note> {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Cannot fetch note by ID');
  return response.json();
}

export async function updateUserProfile(data: UpdateUserProfile): Promise<User> {
  const response = await fetch('/api/users/me', {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Cannot update profile');
  return response.json();
}
