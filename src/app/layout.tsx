import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "maidana07/components/ui/sonner"
import Header from "maidana07/layouts/header/header";
import Footer from "maidana07/layouts/footer/footer";
import { ThemeProvider } from "maidana07/providers/theme-provider";
import CommandDialogSearch from "maidana07/components/search/command-dialog"
import { Suspense } from "react";
import ScrollToTop from "maidana07/components/scroll-to-top";
import customMetadata from "../../public/metadata.json";

export const viewport: Viewport = {
  themeColor: "#690016b4",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://maidavision.vercel.app"),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: customMetadata.title.default,
  },
  formatDetection: {
    telephone: false,
  },
  applicationName: "MaidaVision",
  other: {
    "msapplication-TileColor": "#690016b4",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
  ...customMetadata,
};

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
            <Suspense>
              {children}
            </Suspense>
            <Suspense>
              <CommandDialogSearch />
            </Suspense>
            <Suspense>
              <Toaster theme="dark" richColors position="bottom-right" />
            </Suspense>
            <Suspense>
              <ScrollToTop />
            </Suspense>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html >
  );
}
