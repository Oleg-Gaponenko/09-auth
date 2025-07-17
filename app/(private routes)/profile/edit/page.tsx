import { getUserProfile } from '@/lib/api/serverApi';
import { Metadata } from 'next';
import EditProfilePage from '../../../../components/EditProfilePage/EditProfilePage';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Your NoteHub Profile',
  description: 'You can update your profile on this page.',
};

export default async function EditProfile() {
  try {
    const userProfile = await getUserProfile();
    return <EditProfilePage user={userProfile} />;
  } catch (error) {
    redirect('/login');
  }
}
