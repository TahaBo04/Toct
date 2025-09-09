// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="section">
      <div className="card" style={{marginBottom:16}}>
        <h1>Trading Ops Control Tower</h1>
        <p className="muted">
          A portfolio app for markets: <b>Risk</b> (VaR & ES), <b>Ops Control</b> (event logging),
          and <b>Compliance</b> (audit PDF). Built with FastAPI + Next.js.
        </p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Risk • VaR & ES</h3>
          <p className="muted">Compute risk from a PnL series using the historical method.</p>
          <a className="btn" href="/risk">Open Risk</a>
        </div>
        <div className="card">
          <h3>Ops Control</h3>
          <p className="muted">Log operational events (stage, entity, latency, SLA).</p>
          <a className="btn" href="/ops-control">Open Ops</a>
        </div>
        <div className="card">
          <h3>Compliance</h3>
          <p className="muted">Download a demo audit report PDF from the backend.</p>
          <a className="btn" href="/compliance">Open Compliance</a>
        </div>
        <div className="card">
          <h3>About</h3>
          <p className="muted">
            This project demonstrates practical risk analytics and operational discipline expected in banks.
          </p>
        </div>
      </div>
    </div>
  );
}
