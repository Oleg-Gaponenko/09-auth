'use client';
import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Oleg Gaponenko</p>
          <p>
            Contact us:{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="mailto:st@notehub.app"
            >
              st@notehub.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
