import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip authentication check for API routes, static files, and public assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/uploads') ||
    pathname.includes('.')
  ) {
    return intlMiddleware(request);
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Public routes that don't need authentication
  const publicRoutes = ['/', '/auth/login', '/auth/register', '/craftsmen'];
  const isPublicRoute = publicRoutes.some(route => pathname.includes(route));

  // Admin routes
  const isAdminRoute = pathname.includes('/admin');

  // Craftsman routes
  const isCraftsmanRoute = pathname.includes('/craftsman/dashboard');

  // Customer routes
  const isCustomerRoute = pathname.includes('/customer/dashboard');

  // If trying to access protected route without auth, redirect to login
  if (!isPublicRoute && !token) {
    const locale = pathname.split('/')[1] || defaultLocale;
    const url = new URL(`/${locale}/auth/login`, request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Role-based access control
  if (token) {
    const userRole = token.role as string;

    // Admin route protection
    if (isAdminRoute && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Craftsman route protection
    if (isCraftsmanRoute && userRole !== 'craftsman') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Customer route protection
    if (isCustomerRoute && userRole !== 'customer') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Continue with i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ar|fr)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
