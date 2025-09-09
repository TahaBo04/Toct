"use client";
import { useState } from "react";
import { api } from "../../lib/api";

export default function OpsPage() {
  const [stage, setStage] = useState("EXEC");
  const [entity, setEntity] = useState("ORD-123");
  const [latency, setLatency] = useState(120);
  const [sla, setSla] = useState(true);
  const [details, setDetails] = useState('{"desk":"CASA_EQ","note":"demo"}');
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    try {
      setErr(null); setRes(null);
      const out = await api("/ops/event", {
        method: "POST",
        body: JSON.stringify({
          stage, entity_id: entity, latency_ms: latency, sla_ok: sla, details_json: details
        })
      });
      setRes(out);
    } catch (e: any) {
      setErr(e?.message || String(e));
    }
  }

  return (
    <div className="section">
      <div className="card">
        <h1>Ops Control • Log Event</h1>
        <label className="label">Stage</label>
        <input className="input" value={stage} onChange={e=>setStage(e.target.value)} />
        <label className="label">Entity ID</label>
        <input className="input" value={entity} onChange={e=>setEntity(e.target.value)} />
        <div className="grid-2">
          <div>
            <label className="label">Latency (ms)</label>
            <input className="input" type="number" value={latency} onChange={e=>setLatency(parseInt(e.target.value||"0"))} />
          </div>
          <div>
            <label className="label">SLA OK?</label>
            <select className="input" value={sla ? "1":"0"} onChange={e=>setSla(e.target.value==="1")}>
              <option value="1">Yes</option><option value="0">No</option>
            </select>
          </div>
        </div>
        <label className="label">Details (JSON)</label>
        <input className="input" value={details} onChange={e=>setDetails(e.target.value)} />
        <button className="btn btn--full" onClick={submit}>Log Event</button>
        {err && <div className="error">Error: {err}</div>}
        {res && <pre className="card" style={{marginTop:12, overflowX:"auto"}}>{JSON.stringify(res,null,2)}</pre>}
      </div>
    </div>
  );
}
