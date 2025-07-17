import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = [
  '/profile',
  '/notes',
  '/notes/',
  '/notes/action/create',
  '/notes/filter',
];
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublic = authRoutes.some((route) => pathname.startsWith(route));

  if (isPrivate && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublic && accessToken) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes/:path*', '/profile', '/sign-in', '/sign-up'],
};
