import { NextRequest, NextResponse } from "next/server"
import { ratelimit } from "./lib/upstash/rate-limit"
import { Session } from "next-auth"
// import { auth } from "./lib/prisma/auth"

// const AUTH_PAGES = ["/login", "/register"]
// const PROTECTED_PAGES = ["/perfil", "/lista", "/favoritos"]

// Bots que SÍ quiero permitir (Google, Bing, etc.)
const allowedBots = [
  "googlebot",
  "bingbot",
  "duckduckbot",
  "yandex",
]

// Bots y librerías que quiero bloquear
const blockedAgents = [
  "meta-externalagent",
  "ChatGPT-User",
  "GPTBot",
  "java",
  "curl",
  "axios",
  "python-requests",
  "node-fetch",
  "wget",
  "libwww-perl",
  "scrapy",
  "httpclient",
  "httpx",
  "go-http-client",
]

// todos estos middlewares están protegidos por rate limiting
// usando upstash y su plan gratuito (100k requests/día)
// sin embargo, pueden relentizar la app si se abusa de ciertas rutas
// pero prefiero eso a que me tumben el servidor

export default (async (req: NextRequest & { auth: Session | null, ip?: string }) => {
  const path = req.nextUrl.pathname;

  // const isAuthPage = AUTH_PAGES.some(page => path.startsWith(page))
  // const isProtectedPage = PROTECTED_PAGES.some(page => path.startsWith(page))

  // if (isAuthPage || isProtectedPage) {
  //   const session = await auth()

  //   if (session && isAuthPage) {
  //     return NextResponse.redirect(new URL('/', req.nextUrl))
  //   }
  //   if (isProtectedPage && !session) {
  //     const callbackUrl = req.nextUrl.pathname + req.nextUrl.search
  //     return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.nextUrl))
  //   }
  // }

  if (process.env.NODE_ENV === 'production') {
    // Aplicar rate limiting solo a ciertas rutas
    const validateRateLimit = (path.startsWith("/pelicula") || path.startsWith("/persona") || path.startsWith("/serie"));

    if (validateRateLimit || path.startsWith("/api")) {
      // Aplicar rate limiting
      const ip = req.ip || req.headers.get("x-forwarded-for") || "127.0.0.1"; // fallback
      const { success } = await ratelimit.limit(ip);

      if (!success) {
        return NextResponse.json(
          { message: "Rate limit exceeded", success: false },
          { status: 429, statusText: "Too Many Requests" }
        )
      }
    }

    // Bloquear requests sin el header Origin o con un Origin no permitido
    const origin = req.headers.get("origin")
    if (origin && !origin.includes(process.env.NEXTAUTH_URL ?? "maidavision.vercel.app")) {
      return NextResponse.json(
        { message: "Invalid origin", success: false },
        { status: 403, statusText: "Forbidden" }
      )
    }

    // Bloquear ciertos user agents
    const ua = req.headers.get("user-agent")?.toLowerCase() ?? ""

    const isAllowedBot = allowedBots.some(bot => ua.includes(bot))
    const isBlockedBot = blockedAgents.some(agent => ua.includes(agent))

    if (!isAllowedBot && /bot|crawl|spider|slurp|search|agent/i.test(ua)) {
      return NextResponse.json(
        { message: "Blocked bot", success: false },
        { status: 403, statusText: "Forbidden" }
      )
    } else if (isBlockedBot) {
      return NextResponse.json(
        { message: "Blocked", success: false },
        { status: 403, statusText: "Forbidden" }
      )
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}