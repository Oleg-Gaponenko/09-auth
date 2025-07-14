'use client';

import css from './error.module.css';

export default function Error({ error }: { error: Error }) {
  return (
    <div className={css.center}>
      <p className={css.error}>
        Could not fetch the list of notes. {error.message}
      </p>
    </div>
  );
}
