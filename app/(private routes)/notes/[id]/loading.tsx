import css from './Loading.module.css';

export default function Loading() {
  return (
    <div className={css.center}>
      <p className={css.loading}>Loading, please wait...</p>
    </div>
  );
}
