import type { Viewport } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata = customMetadata;

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
