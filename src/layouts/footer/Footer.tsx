// components/footer.tsx

import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-6 pb-3 px-4 md:px-8 bg-muted/30 text-muted-foreground">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Link href="https://github.com/maidana0" target="_blank" aria-label="GitHub">
            <Github className="h-5 w-5 hover:text-foreground transition-colors" />
          </Link>
          <Link href="https://instagram.com/franco_maidana07" target="_blank" aria-label="Instagram">
            <Instagram className="h-5 w-5 hover:text-foreground transition-colors" />
          </Link>
          <Link href="https://linkedin.com/in/maidana-franco07" target="_blank" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 hover:text-foreground transition-colors" />
          </Link>
        </div>

        <p className="text-sm text-center">
          © {new Date().getFullYear()} MaidaVision.
        </p>
      </div>

    </footer>
  );
}
