// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('acc-tk')?.value;
  const { pathname } = request.nextUrl;

  // 1. Handle the Root path "/"
  if (pathname === '/') {
    // If logged in, go to dashboard. If not, go to login.
    const destination = token ? '/dashboard' : '/login';
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // 2. Define protected paths
  const protectedPaths = ['/dashboard', '/users', '/products'];
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  // 3. Auth Logic
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Ensure the root "/" is included in the matcher
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};