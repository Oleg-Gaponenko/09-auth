import css from './not-found.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'Oops! It seems the page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'Oops! It seems the page you are looking for does not exist.',
    url: 'https://08-zustand-three-ecru.vercel.app/404',
    images: [
      {
        url: 'https://dfrreq9ujwfc9kld.public.blob.vercel-storage.com/not-found.png',
        width: 1200,
        height: 630,
        alt: 'A preview image of error 404 - page not found',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div className={css.center}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
