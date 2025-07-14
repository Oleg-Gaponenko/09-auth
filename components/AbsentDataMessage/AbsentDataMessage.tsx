import css from './AbsentDataMessage.module.css';

export default function AbsentDataMessage() {
  return (
    <div className={css.center}>
      <p className={css.absent}>Notes are not found</p>
    </div>
  );
}
