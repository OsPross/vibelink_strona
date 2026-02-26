import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Pobierz język z URL (np. /en/dashboard -> en)
  const segments = pathname.split('/');
  const lang = segments[1];

  // Jeśli użytkownik próbuje wejść do dashboardu bez tokena
  if (pathname.includes('/dashboard') && !token) {
    return NextResponse.redirect(new URL(`/${lang}/login`, request.url));
  }

  // Jeśli zalogowany użytkownik próbuje wejść na login/register - wpuść go do dashboardu
  if ((pathname.includes('/login') || pathname.includes('/register')) && token) {
    return NextResponse.redirect(new URL(`/${lang}/dashboard`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Middleware działa na wszystkich trasach poza statycznymi plikami i API
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};