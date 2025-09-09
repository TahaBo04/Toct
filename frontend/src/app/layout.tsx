// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "TOCT — Trading Ops Control Tower",
  description: "Risk (VaR/ES), Ops Control, and Compliance demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <div className="container nav__wrap">
            <a className="brand" href="/">TOCT<span className="brand__dot">•</span></a>
            <nav className="nav__links">
              <a href="/">Home</a>
              <a href="/risk">Risk</a>
              <a href="/ops-control">Ops Control</a>
              <a href="/compliance">Compliance</a>
            </nav>
          </div>
        </header>

        <main className="container main">{children}</main>

        <footer className="footer">
          <div className="container footer__wrap">
            <span>© {new Date().getFullYear()} Boulaamane Taha — Process Engineer → Markets</span>
            <span className="muted small">TOCT v1</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
