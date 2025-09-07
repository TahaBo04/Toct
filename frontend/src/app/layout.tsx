import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body>
      <nav className="sticky top-0 z-10 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-6">
          <Link href="/" className="font-semibold">TOCT</Link>
          <Link href="/market-lab">Market Lab</Link>
          <Link href="/risk">Risk</Link>
          <Link href="/ops-control">Ops Control</Link>
          <Link href="/compliance">Compliance</Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      <footer className="max-w-5xl mx-auto px-4 py-10 opacity-70">
        Built by <span className="font-semibold">Boulaamane Taha</span> — Process Engineer → Markets
      </footer>
    </body></html>
  );
}
