"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Price = { ts: string; close: number; open:number; high:number; low:number; volume:number };
export default function MarketLab() {
  const [symbol,setSymbol]=useState("MASI.X");
  const [prices,setPrices]=useState<Price[]>([]);
  const [res,setRes]=useState<any>(null);
  const [lookback,setLookback]=useState(20);
  const [oos,setOos]=useState(0.3);
  const [strategy,setStrategy]=useState<"momentum"|"mean_reversion">("momentum");

  useEffect(()=>{ api<Price[]>(`/market/prices?symbol=${symbol}`).then(setPrices).catch(console.error); },[symbol]);

  async function run() {
    const r = await api<any>("/backtest/run",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify({symbol, lookback, oos_pct:oos, strategy})
    });
    setRes(r);
  }

  return (
    <div className="space-y-6">
      <h1 className="h1">Market Lab</h1>
      <div className="card grid md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm opacity-80">Symbol</label>
          <input className="w-full bg-white/5 border border-white/10 rounded px-3 py-2"
                 value={symbol} onChange={e=>setSymbol(e.target.value)}/>
        </div>
        <div>
          <label className="block text-sm opacity-80">Lookback</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2"
                 value={lookback} onChange={e=>setLookback(parseInt(e.target.value||"20"))}/>
        </div>
        <div>
          <label className="block text-sm opacity-80">OOS %</label>
          <input type="number" step="0.05" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2"
                 value={oos} onChange={e=>setOos(parseFloat(e.target.value||"0.3"))}/>
        </div>
        <div>
          <label className="block text-sm opacity-80">Strategy</label>
          <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2"
                  value={strategy} onChange={e=>setStrategy(e.target.value as any)}>
            <option value="momentum">Momentum</option>
            <option value="mean_reversion">Mean Reversion</option>
          </select>
        </div>
        <button onClick={run} className="md:col-span-4 mt-2 bg-emerald-400/20 border border-emerald-400/40 px-4 py-2 rounded">
          Run Backtest
        </button>
      </div>

      <div className="card">
        <div className="font-semibold mb-2">Latest Close</div>
        <div className="opacity-80">
          {prices.length ? `${symbol}: ${prices[prices.length-1].close.toFixed(2)}` : "Loading…"}
        </div>
      </div>

      {res && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <div className="font-semibold">In-Sample</div>
            <pre className="opacity-80 text-sm mt-2">{JSON.stringify(res.in_sample, null, 2)}</pre>
          </div>
          <div className="card">
            <div className="font-semibold">Out-of-Sample</div>
            <pre className="opacity-80 text-sm mt-2">{JSON.stringify(res.out_of_sample, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
