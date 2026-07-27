import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from './utils/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  const isAdminSubdomain = hostname === 'admin.expressclean.uz' || hostname?.startsWith('admin.localhost');

  // First run Supabase session check
  const supabaseResponse = await updateSession(request);
  
  // If updateSession returned a redirect, we respect that and redirect the user
  if (supabaseResponse.headers.get('location')) {
    return supabaseResponse;
  }

  // Barcha public va admin sahifalar uchun intl middleware ishlaydi
  const intlResponse = intlMiddleware(request);

  // Copy cookies set by Supabase over to the intl response
  const supabaseSetCookie = supabaseResponse.headers.get('set-cookie');
  if (supabaseSetCookie) {
    intlResponse.headers.set('set-cookie', supabaseSetCookie);
  }

  // Admin Subdomain Routing: Modify the rewrite URL after next-intl processes it
  if (isAdminSubdomain) {
    const rewriteHeader = intlResponse.headers.get('x-middleware-rewrite');
    if (rewriteHeader) {
      const rewriteUrl = new URL(rewriteHeader);
      const pathParts = rewriteUrl.pathname.split('/').filter(Boolean);
      const locales = ['uz', 'ru'];
      
      // Agar locale mavjud bo'lsa va keyingi path 'admin' bo'lmasa, admin ni qo'shamiz
      if (pathParts.length > 0 && locales.includes(pathParts[0]) && pathParts[1] !== 'admin') {
        const rest = pathParts.slice(1).join('/');
        rewriteUrl.pathname = `/${pathParts[0]}/admin${rest ? `/${rest}` : ''}`;
        
        intlResponse.headers.set('x-middleware-rewrite', rewriteUrl.toString());
      }
    }
  }

  return intlResponse;
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/',
    '/(uz|ru)/:path*'
  ]
};
