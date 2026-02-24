// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('acc-tk')?.value;
  const refreshToken = request.cookies.get('ref-tk')?.value; // Ensure you save this during login!
  const { pathname } = request.nextUrl;

  // 1. Handle the Root path "/"
  if (pathname === '/') {
    const destination = (accessToken || refreshToken) ? '/dashboard' : '/login';
    return NextResponse.redirect(new URL(destination, request.url));
  }

  const protectedPaths = ['/dashboard', '/users', '/products'];
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  // 2. EXPIRED ACCESS TOKEN LOGIC
  // If we are on a protected route, have no access token, but DO have a refresh token
  if (isProtected && !accessToken && refreshToken) {
    try {
      const response = await fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: refreshToken,
          expiresInMins: 30, // Optional: duration for the new token
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('🔄 Token refreshed successfully');
        
        // Create the response and set the new cookie
        const res = NextResponse.next();
        res.cookies.set('acc-tk', data.accessToken, {
          path: '/',
          maxAge: 60 * 30, // 30 minutes
          httpOnly: true, // Security best practice
        });
        return res;
      }
    } catch (error) {
      console.error('Refresh failed:', error);
      // If refresh fails, fall through to redirect to login
    }
  }

  // 3. Standard Auth Logic
  if (isProtected && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/login' && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};