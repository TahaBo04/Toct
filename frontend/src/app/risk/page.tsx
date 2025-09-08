"use client";

import { useState } from "react";
import { api } from "../../lib/api";

export default function RiskPage() {
  const [pnl, setPnl] = useState("-1.2, 0.4, 0.1, -0.8, 0.3, -2.1, 0.7, -0.5, 0.6, -0.2");
  const [level, setLevel] = useState(0.99);
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function compute() {
    setErr(null); setRes(null);
    const arr = pnl.split(",").map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    try {
      const out = await api("/risk/var", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pnl_series: arr, level })
      });
      setRes(out);
    } catch (e:any) {
      setErr(String(e));
    }
  }

  return (
    <div className="card">
      <h1>Risk • VaR & ES</h1>
      <div style={{display:"grid", gap:12}}>
        <textarea className="textarea" value={pnl} onChange={e=>setPnl(e.target.value)} rows={4}/>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <label>Level:</label>
          <input className="input" type="number" step="0.001" value={level}
                 onChange={e=>setLevel(parseFloat(e.target.value))}/>
          <button className="btn" onClick={compute}>Compute</button>
        </div>
        {err && <div style={{color:"#fca5a5"}}>{err}</div>}
        {res && <pre className="card" style={{overflowX:"auto"}}>{JSON.stringify(res,null,2)}</pre>}
      </div>
    </div>
  );
}
