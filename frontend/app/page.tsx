"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import IntakeForm from "../components/IntakeForm";
import VoiceIntake from "../components/VoiceIntake";
import LoadingScanner from "../components/LoadingScanner";
import { analyzeBusiness } from "../lib/api";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: {
    business_description: string;
    origin_province: string;
    target_province: string;
  }) {
    setError(null);
    setLoading(true);
    try {
      const result = await analyzeBusiness(data);
      router.push(`/results/${result.analysis_id}`);
    } catch (e) {
      setError("something went wrong reaching the backend. is it running?");
      setLoading(false);
    }
  }

  return (
    <main className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="font-display text-4xl gradient-text">interbridge</h1>
        <p className="text-white/60 max-w-lg mx-auto">
          find out which provincial regulations are actually blocking your
          expansion, in plain language, with a checklist to fix it
        </p>
      </div>

      {loading ? (
        <LoadingScanner />
      ) : (
        <>
          <IntakeForm onSubmit={handleSubmit} />
          <VoiceIntake />
        </>
      )}

      {error && (
        <p className="text-blocker text-sm text-center">{error}</p>
      )}
    </main>
  );
}
