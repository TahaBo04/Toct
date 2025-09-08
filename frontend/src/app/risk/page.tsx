"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function RiskPage() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    api("/risk?confidence=0.95")
      .then(setResult)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Risk (VaR / ES)</h1>
      {result ? (
        <pre className="bg-gray-900 text-green-400 p-4 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : (
        <p>Loading risk metrics...</p>
      )}
    </div>
  );
}
