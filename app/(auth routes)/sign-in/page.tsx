'use client';

import css from './sign-in.module.css';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { userLogIn } from '@/lib/api/clientApi';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')?.toString().trim() || '';
    const password = formData.get('password')?.toString().trim() || '';

    if (!email || !password) {
      setError('Please fill in both email and password fields.');
      return;
    }

    try {
      await userLogIn({ email, password });
      router.push('/profile');
    } catch (error: any) {
      setError(
        error?.message ||
          'Oops! Login failed. Please check your email and password and try again.'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
