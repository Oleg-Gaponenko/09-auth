'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { updateUserProfile } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';

interface UserProps {
  user: User;
}

export default function EditProfilePage({ user }: UserProps) {
  const router = useRouter();
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar ?? '');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await updateUserProfile({ username, avatar });
      toast.success('Your profile updated!');
      router.push('/profile');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar || '/default-avatar.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={css.usernameWrapper}>
            <label htmlFor="avatar">Avatar URL:</label>
            <input
              id="avatar"
              type="text"
              className={css.input}
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
