"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request Quote"}
      </Button>
      {status === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400">Quote request sent.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
