import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Trading Ops Control Tower — Portfolio",
  description: "Risk, Ops Control, and Compliance demo."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="container" style={{display:"flex",gap:16,alignItems:"center"}}>
          <Link href="/" style={{fontWeight:700}}>TOCT</Link>
          <Link href="/risk">Risk</Link>
          <Link href="/ops-control">Ops Control</Link>
          <Link href="/compliance">Compliance</Link>
        </nav>
        <main className="container">{children}</main>
        <footer className="container" style={{opacity:.7,paddingBottom:32}}>
          Built by Boulaamane Taha — Process Engineer → Markets
        </footer>
      </body>
    </html>
  );
}
