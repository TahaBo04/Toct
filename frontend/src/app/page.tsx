export default function Home() {
  const Tile = ({title, desc, href}:{title:string;desc:string;href:string}) => (
    <a href={href} className="card hover:bg-white/10 transition">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="opacity-80 mt-2">{desc}</p>
    </a>
  );

  return (
    <div className="space-y-8">
      <h1 className="h1">Trading Ops Control Tower</h1>
      <p className="opacity-80">
        A banking-grade demo that combines market backtesting, risk analytics, operational throughput,
        and a tamper-evident audit trail. Designed by a Process Engineer for financial markets desks.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <Tile title="Market Lab"
              desc="Backtests with walk-forward splits and clean metrics."
              href="/market-lab"/>
        <Tile title="Risk"
              desc="Historical VaR & Expected Shortfall from PnL series."
              href="/risk"/>
        <Tile title="Ops Control"
              desc="Lifecycle stages, SLAs, queue latency and logs."
              href="/ops-control"/>
        <Tile title="Compliance"
              desc="Audit chain and 1-click PDF report."
              href="/compliance"/>
      </div>
      <div className="card">
        <div className="kpi">Case Study • MASI proxy portfolio</div>
        <p className="opacity-80 mt-2">Focus: Moroccan market awareness, robust process, risk controls.</p>
      </div>
    </div>
  );
}
