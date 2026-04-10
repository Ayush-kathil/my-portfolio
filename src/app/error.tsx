"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled app error:", error);
  }, [error]);

  return (
    <main className="min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center px-6">
      <section className="w-full max-w-2xl rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/70 p-8 md:p-12 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="mt-4 text-[var(--text-secondary)] text-base md:text-lg">
          The page hit an unexpected runtime error. Please retry.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center justify-center rounded-full border border-[var(--border-color)] px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
        >
          Try again
        </button>
      </section>
    </main>
  );
}