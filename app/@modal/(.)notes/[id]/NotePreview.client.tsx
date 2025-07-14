'use client';

import AbsentDataMessage from '@/components/AbsentDataMessage/AbsentDataMessage';
import Loader from '@/components/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface NotePreviewProps {
  noteId: number;
}

export default function NotePreviewModal({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const handleClosePreview = () => router.back();

  if (isLoading)
    return (
      <Modal onClose={handleClosePreview}>
        <Loader />
      </Modal>
    );

  if (isError || !data)
    return (
      <Modal onClose={handleClosePreview}>
        <AbsentDataMessage />
      </Modal>
    );

  return (
    <Modal onClose={handleClosePreview}>
      <NotePreview note={data} />
    </Modal>
  );
}
