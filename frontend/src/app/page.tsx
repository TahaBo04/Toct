import Link from "next/link";

export default function Home() {
  return (
    <div className="grid2">
      <div className="card">
        <h2>Risk</h2>
        <p>Compute VaR & Expected Shortfall from a PnL series.</p>
        <Link className="btn" href="/risk">Open Risk</Link>
      </div>
      <div className="card">
        <h2>Ops Control</h2>
        <p>Log lifecycle events with SLA status (hash-chained in backend).</p>
        <Link className="btn" href="/ops-control">Open Ops Control</Link>
      </div>
      <div className="card">
        <h2>Compliance</h2>
        <p>View the generated audit PDF report from the backend.</p>
        <Link className="btn" href="/compliance">Open Compliance</Link>
      </div>
    </div>
  );
}
