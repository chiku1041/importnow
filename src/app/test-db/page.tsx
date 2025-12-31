"use client";

import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function TestDBPage() {
  const [status, setStatus] = useState("Checking...");
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const testConnection = async () => {
      // Check 1: Environment variables
      if (!isSupabaseConfigured()) {
        setStatus("❌ Not Configured - Missing environment variables");
        return;
      }

      // Check 2: Test query
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .limit(1);

        if (error) {
          setStatus(`❌ Error: ${error.message}`);
          setDetails(error);
        } else {
          setStatus("✅ Connected Successfully!");
          setDetails({
            message: "Database connection is working",
            data: data,
            count: data?.length || 0
          });
        }
      } catch (err: any) {
        setStatus(`❌ Connection Failed: ${err.message}`);
        setDetails(err);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="container-custom py-20">
      <h1 className="text-3xl font-bold mb-4">Database Connection Test</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-xl mb-4">Status: {status}</p>
        <details>
          <summary className="cursor-pointer text-blue-600">View Details</summary>
          <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
            {JSON.stringify(details, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}

