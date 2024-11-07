import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Protected Routes
const isCustomerRoute = createRouteMatcher(['/customer(.*)']);
const isHomeRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith('/customer/services')) return NextResponse.next();

  if (req.nextUrl.pathname.startsWith('/customer/predictor')) return NextResponse.next();

  if (!auth().userId && isCustomerRoute(req)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const userId = auth().userId;
  if (typeof userId === 'string') {
    const user = await clerkClient().users.getUser(userId as string);
    if (user && isHomeRoute(req)) {
      return NextResponse.redirect(new URL('/customer', req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
