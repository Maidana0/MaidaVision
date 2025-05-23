import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "maidana07/components/ui/sonner"
import Header from "maidana07/layouts/header/header";
import Footer from "maidana07/layouts/footer/footer";
import { ThemeProvider } from "maidana07/providers/theme-provider";
import CommandDialogSearch from "maidana07/components/search/command-dialog"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MaidaVision",
  description: "Generated by create next app",
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
