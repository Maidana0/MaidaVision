import authConfig from "maidana07/lib/prisma/auth.config"
import NextAuth from "next-auth"
import { NextResponse } from "next/server"
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)

const AUTH_PAGES = ["/login", "/register"]
const PROTECTED_PAGES = ["/perfil", "/lista", "/favoritos"]

export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isAuthPage = AUTH_PAGES.includes(nextUrl.pathname)
  const isProtectedPage = PROTECTED_PAGES.some(page => nextUrl.pathname.startsWith(page))

  // Si está logueado y trata de acceder a páginas de auth, redirigir al home
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  // Si no está logueado y trata de acceder a páginas protegidas, redirigir al login
  if (!isLoggedIn && isProtectedPage) {
    const callbackUrl = nextUrl.pathname + nextUrl.search
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl))
  }

  return NextResponse.next()
})

//   if (req.auth != null && AUTH_PAGES.includes(req.nextUrl.pathname)) {
//     const newUrl = new URL("/", req.nextUrl.origin)
//     return Response.redirect(newUrl)
//   }
//   return NextResponse.next();
// })

export const config = {
  // Apply the middleware to all routes except for the ones specified
  // in the matcher array
  // Adjust the matcher according to your application's needs
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}