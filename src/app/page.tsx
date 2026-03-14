"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Example fetch to the API
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://maas-api.up.railway.app";
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("API Fetch Error:", err));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl text-center"
      >
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          MaaS Frontend
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Code-only deployment running on Vercel. 
          Connected to: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{process.env.NEXT_PUBLIC_API_BASE_URL || "https://maas-api.up.railway.app"}</span>
        </p>
        
        {data ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold mb-2">API Status</h2>
            <pre className="text-sm text-left bg-gray-50 p-4 rounded overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        ) : (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-gray-500"
          >
            Connecting to API...
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}