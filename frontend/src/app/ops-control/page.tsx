"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export default function OpsControl() {
  const [stage,setStage]=useState("EXEC");
  const [entity,setEntity]=useState("ORD-123");
  const [lat,setLat]=useState(120);
  const [ok,setOk]=useState(true);
  const [details,setDetails]=useState('{"desk":"CASA_EQ","note":"demo"}');
  const [result,setResult]=useState<any>(null);

  async function push() {
    const r = await api("/ops/event",{method:"POST",headers:{"Content-Type":"application/json"},
      body: JSON.stringify({stage, entity_id:entity, latency_ms:lat, sla_ok:ok, details_json:details})});
    setResult(r);
  }

  return (
    <div className="space-y-6">
      <h1 className="h1">Ops Control</h1>
      <p className="opacity-80">Log lifecycle events; each is hash-chained for tamper evidence.</p>
      <div className="card grid md:grid-cols-5 gap-3">
        <input className="bg-white/5 border border-white/10 rounded px-3 py-2" value={stage} onChange={e=>setStage(e.target.value)} />
        <input className="bg-white/5 border border-white/10 rounded px-3 py-2" value={entity} onChange={e=>setEntity(e.target.value)} />
        <input type="number" className="bg-white/5 border border-white/10 rounded px-3 py-2" value={lat} onChange={e=>setLat(parseInt(e.target.value))} />
        <select className="bg-white/5 border border-white/10 rounded px-3 py-2" value={ok? "1":"0"} onChange={e=>setOk(e.target.value==="1")} >
          <option value="1">SLA OK</option><option value="0">SLA Breach</option>
        </select>
        <input className="bg-white/5 border border-white/10 rounded px-3 py-2 md:col-span-2" value={details} onChange={e=>setDetails(e.target.value)} />
        <button onClick={push} className="bg-emerald-400/20 border border-emerald-400/40 px-4 py-2 rounded md:col-span-3">Log Event</button>
      </div>
      {result && <div className="card"><pre>{JSON.stringify(result,null,2)}</pre></div>}
    </div>
  );
}
