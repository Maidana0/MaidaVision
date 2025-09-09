import authConfig from "maidana07/lib/prisma/auth.config"
import NextAuth from "next-auth"
import { NextResponse } from "next/server"
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)

const AUTH_PAGES = ["/login", "/register"]

export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
  if (req.auth && AUTH_PAGES.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/", req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }
  return NextResponse.next();
})

export const config = {
  // Apply the middleware to all routes except for the ones specified
  // in the matcher array
  // Adjust the matcher according to your application's needs
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}