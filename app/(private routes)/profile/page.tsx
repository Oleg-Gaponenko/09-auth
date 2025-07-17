import { getUserProfile } from '@/lib/api/serverApi';
import { Metadata } from 'next';
import css from './profile.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Your NoteHub Profile',
  description: 'Manage your NoteHub profile settings in one place',
};

export default async function Profile() {
  let userProfile;

  try {
    userProfile = await getUserProfile();
  } catch (error) {
    redirect('/sign-in');
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={userProfile?.avatar ?? '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {userProfile?.username ?? 'N/A'}</p>
          <p>Email: {userProfile?.email}</p>
        </div>
      </div>
    </main>
  );
}
