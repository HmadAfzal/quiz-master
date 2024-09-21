import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/', '/sign-in', '/sign-up', '/profile', '/leaderboard'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const url = request.nextUrl.clone();

  if (token) {

    if (['/sign-in', '/sign-up'].includes(url.pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  const restrictedPaths = ['/', '/profile', '/leaderboard'];
  if (!token && restrictedPaths.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}
