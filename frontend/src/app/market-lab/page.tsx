"use client";

import { useState } from "react";
import { api } from "../../lib/api";

export default function MarketLabPage() {
  const [result, setResult] = useState<any>(null);

  const runBacktest = async () => {
    try {
      const res = await api("/backtest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategy: "demo" }),
      });
      setResult(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Market Lab</h1>
      <button
        onClick={runBacktest}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        Run Demo Backtest
      </button>

      {result && (
        <pre className="bg-gray-900 text-green-400 p-4 rounded mt-4">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
