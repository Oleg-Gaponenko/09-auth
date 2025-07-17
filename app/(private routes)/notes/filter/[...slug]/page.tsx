import { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';
// import { fetchNotes } from '@/lib/api/clientApi';
import { Metadata } from 'next';

interface NotesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0].toLowerCase();
  const initialTag = tag ? tag?.charAt(0).toUpperCase() + tag?.slice(1) : '';

  const metaTitle = tag
    ? `Notes tagged with "${initialTag}" | NoteHub`
    : 'All Notes | NoteHub';

  const metaDescription = tag
    ? `Look through notes tagged as "${initialTag}" on NoteHub.`
    : 'Look through all notes on NoteHub.';

  const metaUrl = tag
    ? `https://08-zustand-three-ecru.vercel.app/notes/filter/${tag}`
    : 'https://08-zustand-three-ecru.vercel.app/notes/filter/all';

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'A preview image for the NoteHub application',
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const initialTag = slug?.[0];
  const tag =
    initialTag && initialTag.toLowerCase() !== 'all'
      ? (initialTag as NoteTag)
      : undefined;
  // const notesData = await fetchNotes({ tag });

  return <NotesClient tag={tag} />;
}
