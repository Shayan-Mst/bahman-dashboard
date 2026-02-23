// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('acc-tk');
  const { pathname } = request.nextUrl;

  // List of paths that require authentication
  const protectedPaths = ['/dashboard', '/users', '/products'];

  // Check if the current path starts with any of our protected paths
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected && !token) {
    // Redirect to login if trying to access a protected route without a token
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Optimization: Only run middleware on these specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/users/:path*', '/products/:path*'],
};