'use client';

import { Note } from '@/types/note';
import css from './NotePreview.module.css';
import { useRouter } from 'next/navigation';

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();
  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={() => router.back()}>
        ← Back
      </button>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <span className={css.date}>
          Created: {new Date(note.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
