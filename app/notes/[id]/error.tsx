'use client';

import css from './Error.module.css';

export default function Error({ error }: { error: Error }) {
  return (
    <div className={css.center || 'backup-center'}>
      <p className={css.error || 'backup-error'}>
        Could not fetch note details. {error.message}
      </p>
    </div>
  );
}
