import NoteForm from '@/components/NoteForm/NoteForm';
import css from '../../../page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Note with NoteHub',
  description:
    'Create a new note in no time by adding a title, content, and a tag',
  openGraph: {
    title: 'Create Note with NoteHub',
    description:
      'Create a new note in no time by adding a title, content, and a tag',
    url: 'https://08-zustand-three-ecru.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'A preview image for the NoteHub app',
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
