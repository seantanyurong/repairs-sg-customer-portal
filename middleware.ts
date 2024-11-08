import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Protected Routes
const isCustomerRoute = createRouteMatcher(["/customer(.*)"]);
const isHomeRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith("/customer/services"))
    return NextResponse.next();

  if (!auth().userId && isCustomerRoute(req)) {
    return NextResponse.redirect(
      new URL(`/sign-in?redirect_url=${req.url}`, req.url)
    );
  }

  const userId = auth().userId;
  if (typeof userId === "string") {
    const user = await clerkClient().users.getUser(userId as string);

    const status = (user.publicMetadata as { status: string }).status;

    if (
      status.toLowerCase() === "blacklisted" &&
      isCustomerRoute(req) &&
      req.nextUrl.pathname !== "/customer/blacklisted"
    ) {
      return NextResponse.redirect(new URL("/customer/blacklisted", req.url));
    }

    if (user && isHomeRoute(req)) {
      return NextResponse.redirect(new URL("/customer", req.url));
    }
  }

  if (
    req.nextUrl.pathname.startsWith("/customer/services") ||
    req.nextUrl.pathname.startsWith("/customer/predictor") ||
    req.nextUrl.pathname.startsWith("/customer/contact-us")
  )
    return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
