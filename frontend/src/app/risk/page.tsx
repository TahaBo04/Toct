"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export default function Risk() {
  const [pnl,setPnl]=useState("-1.2, 0.4, 0.1, -0.8, 0.3, -2.1, 0.7, -0.5, 0.6, -0.2");
  const [level,setLevel]=useState(0.99);
  const [res,setRes]=useState<any>(null);

  async function calc() {
    const arr = pnl.split(",").map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
    const r = await api("/risk/var",{method:"POST",headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ pnl_series: arr, level })});
    setRes(r);
  }

  return (
    <div className="space-y-6">
      <h1 className="h1">Risk • VaR & ES</h1>
      <div className="card space-y-3">
        <textarea className="w-full bg-white/5 border border-white/10 rounded p-3 h-32"
                  value={pnl} onChange={e=>setPnl(e.target.value)} />
        <div className="flex gap-3 items-center">
          <span>Level</span>
          <input type="number" step="0.001" className="bg-white/5 border border-white/10 rounded px-3 py-2"
                 value={level} onChange={e=>setLevel(parseFloat(e.target.value))}/>
          <button onClick={calc} className="bg-emerald-400/20 border border-emerald-400/40 px-4 py-2 rounded">Compute</button>
        </div>
      </div>
      {res && <div className="card"><pre>{JSON.stringify(res,null,2)}</pre></div>}
    </div>
  );
}
