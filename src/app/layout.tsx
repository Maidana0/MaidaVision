import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "maidana07/components/ui/sonner"
import Header from "maidana07/layouts/header/header";
import Footer from "maidana07/layouts/footer/footer";
import { ThemeProvider } from "maidana07/providers/theme-provider";
import CommandDialogSearch from "maidana07/components/search/command-dialog"

export const metadata: Metadata = {
  title: {
    default: 'MaidaVision | Tu app para seguir películas y series',
    template: '%s | MaidaVision'
  },
  description: 'Descubre, busca y sigue tus películas y series favoritas. Encuentra contenido en tendencia y mantén un registro de lo que quieres ver.',
  keywords: ['películas', 'series', 'streaming', 'TMDB', 'watchlist', 'tendencias', 'entertainment', 'Netflix', 'Disney+', 'Prime Video'],
  authors: [{ name: 'Maidana0' }],
  creator: 'Maidana0',
  publisher: 'MaidaVision',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://maidavision.vercel.app',
    title: 'MaidaVision | Tu app para seguir películas y series',
    description: 'Descubre, busca y sigue tus películas y series favoritas',
    siteName: 'MaidaVision',
    // images: [
    //   {
    //     url: '/og-image.jpg', // Asegúrate de tener esta imagen en tu carpeta public
    //     width: 1200,
    //     height: 630,
    //     alt: 'MaidaVision Preview'
    //   }
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaidaVision | Tu app para seguir películas y series',
    description: 'Descubre, busca y sigue tus películas y series favoritas',
    // images: ['/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  // icons: {
  //   icon: '/favicon.ico',
  //   apple: '/apple-icon.png',
  // },
  manifest: '/manifest.json',
}
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <Header />
          <main>
            {children}
            <CommandDialogSearch />
            <Toaster theme="dark" richColors position="bottom-right" />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html >
  );
}
