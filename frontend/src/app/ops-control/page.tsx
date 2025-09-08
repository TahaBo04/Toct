"use client";

import { useState } from "react";
import { api } from "../../lib/api";

export default function OpsControlPage() {
  const [message, setMessage] = useState("");
  const [log, setLog] = useState<any>(null);

  const handleLog = async () => {
    try {
      const res = await api("/ops/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      setLog(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Ops Control</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter an event message"
        className="border px-3 py-2 rounded w-80 mr-2 text-black"
      />
      <button
        onClick={handleLog}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Log Event
      </button>

      {log && (
        <pre className="bg-gray-900 text-green-400 p-4 rounded mt-4">
          {JSON.stringify(log, null, 2)}
        </pre>
      )}
    </div>
  );
}
