import { Metadata } from 'next';
import EditProfilePage from '../../../../components/EditProfilePage/EditProfilePage';

export const metadata: Metadata = {
  title: 'Edit Your NoteHub Profile',
  description: 'You can update your profile on this page.',
};

export default function EditProfile() {
  return <EditProfilePage />;
}
