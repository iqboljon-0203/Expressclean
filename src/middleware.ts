import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from './utils/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host');
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

  // Admin Subdomain Routing
  if (isAdminSubdomain) {
    const isRedirect = intlResponse.headers.has('location');
    
    // Agar next-intl redirect qilayotgan bo'lsa (masalan / dan /uz ga), unga tegmaymiz
    // U redirect qilib qaytgach, keyingi so'rovda ishlaymiz.
    if (!isRedirect) {
      let targetUrl: URL | null = null;
      const rewriteHeader = intlResponse.headers.get('x-middleware-rewrite');
      
      if (rewriteHeader) {
        targetUrl = new URL(rewriteHeader);
      } else {
        // Agar rewrite qilinmagan bo'lsa (ya'ni to'g'ridan-to'g'ri /uz bosilgan bo'lsa)
        targetUrl = request.nextUrl.clone();
      }

      const pathParts = targetUrl.pathname.split('/').filter(Boolean);
      const locales = ['uz', 'ru'];
      
      // Agar locale mavjud bo'lsa va keyingi path 'admin' bo'lmasa, admin ni qo'shamiz
      if (pathParts.length > 0 && locales.includes(pathParts[0]) && pathParts[1] !== 'admin') {
        const rest = pathParts.slice(1).join('/');
        targetUrl.pathname = `/${pathParts[0]}/admin${rest ? `/${rest}` : ''}`;
        
        // Agar next-intl rewrite qaytargan bo'lsa, x-middleware-rewrite ni o'zgartiramiz
        if (rewriteHeader) {
          intlResponse.headers.set('x-middleware-rewrite', targetUrl.toString());
          return intlResponse;
        } else {
          // Agar next-intl oddiy javob qaytargan bo'lsa (NextResponse.next()), biz uni rewrite ga aylantiramiz
          const rewriteResponse = NextResponse.rewrite(targetUrl);
          // Hamma cookie va headerlarni ko'chirib o'tkazamiz
          intlResponse.headers.forEach((value, key) => {
            if (key.toLowerCase() !== 'x-middleware-next') {
              rewriteResponse.headers.set(key, value);
            }
          });
          return rewriteResponse;
        }
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
