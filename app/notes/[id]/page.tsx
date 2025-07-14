import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import getQueryClient from '@/lib/getQueryClient';
import NoteDetails from './NoteDetails.client';
import { Metadata } from 'next';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const noteId = Number(id);

  try {
    const note = await fetchNoteById(noteId);

    return {
      title: `${note.title} | NoteHub`,
      description: note.content?.slice(0, 150) || 'Note details from NoteHub',
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content?.slice(0, 150) || 'Note details from NoteHub',
        url: `https://08-zustand-three-ecru.vercel.app/notes/${noteId}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Note not found | NoteHub',
      description: 'This note does not exist or has been deleted.',
    };
  }
}

export default async function NoteDetailsPage({ params }: NoteDetailsProps) {
  const { id } = await params;
  const noteId = Number(id);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
