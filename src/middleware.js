import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    // শুধু /trips/[কিছু] protect করবে
    "/trips/:path+",
    "/community/:path+"
  ],
};

// middleware.js

export function middleware(req) {
  const role = req.cookies.get("role")?.value;

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/dashboard")) {
    if (!role) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    // Repeat for seller, deliveryman
  }

  return NextResponse.next();
}

