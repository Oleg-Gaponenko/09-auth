import { fetchNoteById } from '@/lib/api/api';
import { notFound } from 'next/navigation';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import NotePreviewModal from './NotePreview.client';

interface NoteModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = await params;
  const noteId = Number(id);

  if (isNaN(noteId)) return notFound();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewModal noteId={noteId} />
    </HydrationBoundary>
  );
}
