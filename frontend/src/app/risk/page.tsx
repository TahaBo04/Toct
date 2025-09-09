"use client";

import { useState } from "react";
import { api } from "../../lib/api";

export default function RiskPage() {
  const [pnl, setPnl] = useState("64.55, 23.61, -0.07, 6.00, -33.24, -1.13");
  const [level, setLevel] = useState(0.99);
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onCompute() {
    try {
      setErr(null); setRes(null);
      const arr = pnl.split(",").map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
      const data = await api("/risk/var", {
        method: "POST",
        body: JSON.stringify({ pnl_series: arr, level })
      });
      setRes(data);
    } catch (e: any) {
      setErr(e?.message || String(e));
    }
  }

  return (
    <div className="section">
      <div className="card">
        <h1>Risk • VaR & ES</h1>

        <label className="label">PnL series (comma-separated)</label>
        <textarea rows={5} className="input" value={pnl} onChange={e=>setPnl(e.target.value)} />

        <div style={{display:"flex", gap:12, alignItems:"center", marginTop:10}}>
          <label className="label" style={{margin:0}}>Level</label>
          <input className="input" style={{maxWidth:180}} type="number" step="0.001"
                 value={level} onChange={e=>setLevel(parseFloat(e.target.value))}/>
          <button className="btn" onClick={onCompute}>Compute</button>
        </div>

        {err && <div className="error">Error: {err}</div>}
        {res && <pre className="card" style={{marginTop:12, overflowX:"auto"}}>
{JSON.stringify(res,null,2)}
        </pre>}
        <p className="small muted" style={{marginTop:12}}>
          Small samples can make VaR = ES (only one point in the tail). Add more days for smoother risk.
        </p>
      </div>
    </div>
  );
}
