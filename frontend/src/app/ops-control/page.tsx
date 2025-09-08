"use client";

import { useState } from "react";
import { api } from "../../lib/api";

export default function OpsControlPage() {
  const [stage, setStage] = useState("EXEC");
  const [entity, setEntity] = useState("ORD-123");
  const [latency, setLatency] = useState(120);
  const [slaOk, setSlaOk] = useState(true);
  const [details, setDetails] = useState('{"desk":"CASA_EQ","note":"demo"}');
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function logEvent() {
    setErr(null); setRes(null);
    try {
      const out = await api("/ops/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage,
          entity_id: entity,
          latency_ms: latency,
          sla_ok: slaOk,
          details_json: details
        })
      });
      setRes(out);
    } catch (e:any) {
      setErr(String(e));
    }
  }

  return (
    <div className="card" style={{display:"grid", gap:12}}>
      <h1>Ops Control</h1>
      <input className="input" value={stage} onChange={e=>setStage(e.target.value)} placeholder="Stage"/>
      <input className="input" value={entity} onChange={e=>setEntity(e.target.value)} placeholder="Entity ID"/>
      <input className="input" type="number" value={latency} onChange={e=>setLatency(parseInt(e.target.value||"0"))} placeholder="Latency (ms)"/>
      <select className="select" value={slaOk ? "1":"0"} onChange={e=>setSlaOk(e.target.value==="1")}>
        <option value="1">SLA OK</option>
        <option value="0">SLA Breach</option>
      </select>
      <input className="input" value={details} onChange={e=>setDetails(e.target.value)} placeholder='{"key":"value"}'/>
      <button className="btn" onClick={logEvent}>Log Event</button>
      {err && <div style={{color:"#fca5a5"}}>{err}</div>}
      {res && <pre className="card" style={{overflowX:"auto"}}>{JSON.stringify(res,null,2)}</pre>}
    </div>
  );
}
