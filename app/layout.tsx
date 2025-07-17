import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'A personal note manager for you | NoteHub',
  description: 'Organize your notes effortlessly with NoteHub. ',
  openGraph: {
    title: 'A personal note manager for you | NoteHub',
    description: 'Organize your notes effortlessly with NoteHub. ',
    url: 'https://08-zustand-three-ecru.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'A preview image for the NoteHub app - personal note manager',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <AuthProvider>
          <TanStackProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </TanStackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
