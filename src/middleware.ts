import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse, NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Работает для /download-from-store и /ru/download-from-store и т.д.
  if (pathname.endsWith('/download-from-store')) {
    const ua = req.headers.get('user-agent')?.toLowerCase() || '';
    console.log('User-Agent:', ua);

    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    if (isIOS) {
      return NextResponse.redirect('https://your-ios-link.com');
    }
    if (isAndroid) {
      return NextResponse.redirect('https://your-android-link.com');
    }
    // return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};