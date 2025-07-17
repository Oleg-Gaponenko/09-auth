'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { updateUserProfile } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { useAuthenticationStore } from '@/lib/store/authStore';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthenticationStore();
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  if (!isAuthenticated || !user) return <Loader />;

  useEffect(() => {
    if (user) {
      setUsername(user.username ?? '');
      setAvatar(user.avatar ?? '');
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isAuthenticated]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username.trim()) {
      toast.error('Username is required');
      return;
    }

    try {
      await updateUserProfile({ username });
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
              onChange={event => setUsername(event.target.value)}
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
              onChange={event => setAvatar(event.target.value)}
              disabled
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
