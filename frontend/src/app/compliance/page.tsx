export default function Compliance() {
  const pdf = (process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000") + "/compliance/audit_report.pdf";
  return (
    <div className="space-y-6">
      <h1 className="h1">Compliance</h1>
      <p className="opacity-80">Immutable audit trail with PDF export for quick reviews.</p>
      <div className="card">
        <a href={pdf} target="_blank" className="underline">Open Audit Report (PDF)</a>
      </div>
    </div>
  );
}
