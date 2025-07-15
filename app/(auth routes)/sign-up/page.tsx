'use client';
import css from './sign-up.module.css';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { userRegistration } from '@/lib/api/clientApi';
import { useAuthenticationStore } from '@/lib/store/authStore';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthenticationStore(state => state.setUser);

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
      const user = await userRegistration({ email, password });
      setUser(user);
      router.push('/profile');
    } catch (error: any) {
      setError(
        error?.message ||
          'Oops! Sign up failed. Please check your details and try again.'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
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
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
