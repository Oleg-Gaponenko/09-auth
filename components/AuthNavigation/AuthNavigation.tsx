'use client';

import css from './AuthNavigation.module.css';
import { userLogOut } from '@/lib/api/clientApi';
import { useAuthenticationStore } from '@/lib/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated, clearIsAuthenticated, setUser } =
    useAuthenticationStore();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session', {
          credentials: 'include',
        });
        if (response.ok) {
          const user = await response.json();
          if (user?.email) {
            setUser(user);
          }
        }
      } catch (error) {
        console.error('[AuthNavigation] Session check failed:', error);
      }
    };

    checkSession();
  }, [setUser]);

  const handleLoggingOut = async () => {
    try {
      await userLogOut();
      clearIsAuthenticated();
      router.push('/sign-in');
    } catch (error) {
      toast.error('Something went wrong while logging out');
    }
  };
  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button onClick={handleLoggingOut} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
