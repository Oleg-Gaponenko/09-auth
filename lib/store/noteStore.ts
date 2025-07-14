import { NoteTag } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo' as NoteTag,
};

interface NoteDraft {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteDraftStore {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(state => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set(() => ({ draft: { ...initialDraft } })),
    }),
    { name: 'note-draft-store', partialize: state => ({ draft: state.draft }) }
  )
);
