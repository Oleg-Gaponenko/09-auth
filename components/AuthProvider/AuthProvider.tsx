'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Loader from '../Loader/Loader';
import { useAuthenticationStore } from '@/lib/store/authStore';
import { User } from '@/types/user';

const privateRoutes = [
  '/profile',
  '/notes',
  '/notes/',
  '/notes/action/create',
  '/notes/filter',
];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser, clearIsAuthenticated } = useAuthenticationStore();

  const [checkingSession, setCheckingSession] = useState(true);

  const isPrivate = privateRoutes.some(route => pathname.startsWith(route));

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch('/api/auth/session', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.status === 200) {
          const user: User = await res.json();
          if (user && user.email) {
            setUser(user);
          } else {
            clearIsAuthenticated();
            if (isPrivate) router.push('/sign-in');
          }
        } else {
          clearIsAuthenticated();
          if (isPrivate) router.push('/sign-in');
        }
      } catch {
        clearIsAuthenticated();
        if (isPrivate) router.push('/sign-in');
      } finally {
        setCheckingSession(false);
      }
    };

    verifySession();
  }, [pathname, isPrivate, router, setUser, clearIsAuthenticated]);

  if (checkingSession) return <Loader />;

  return <>{children}</>;
}
