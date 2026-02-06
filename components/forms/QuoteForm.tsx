"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function QuoteForm() {
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
      if (res.ok) {
        e.currentTarget.reset();
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Quote Request Sent!</h3>
        <p className="text-muted-foreground mb-6">
          We&apos;ve received your request and will get back to you within 24 hours.
        </p>
        <Button
          onClick={() => setStatus("idle")}
          variant="outline"
        >
          Submit Another Request
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Row 1: Name and Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-semibold text-foreground">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-semibold text-foreground">
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Row 2: Phone and Category */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-sm font-semibold text-foreground">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
            placeholder="+44 123 456 7890"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="category" className="block text-sm font-semibold text-foreground">
            Service Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
          >
            <option value="">Select a category</option>
            <option value="clothing">Clothing & Apparel Printing</option>
            <option value="large-format">Large Format Printing & Displays</option>
            <option value="print-marketing">Print Marketing Products</option>
          </select>
        </div>
      </div>

      {/* Row 3: Project Details */}
      <div className="space-y-1.5">
        <label htmlFor="project-details" className="block text-sm font-semibold text-foreground">
          Project Details <span className="text-accent">*</span>
        </label>
        <textarea
          id="project-details"
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors resize-none"
          placeholder="Tell us about your project, quantity, specifications, and any special requirements..."
        />
      </div>

      {/* Row 4: Quantity */}
      <div className="space-y-1.5">
        <label htmlFor="quantity" className="block text-sm font-semibold text-foreground">
          Estimated Quantity
        </label>
        <input
          id="quantity"
          name="quantity"
          type="text"
          className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
          placeholder="e.g., 100 units, 500 pieces"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-center">
        <Button
          type="submit"
          disabled={status === "loading"}
          variant="primary"
          className="w-full md:w-auto px-8 py-3 text-base font-semibold"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Request...
            </>
          ) : (
            "Submit Quote Request"
          )}
        </Button>
      </div>

      {/* Error Message */}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border-2 border-red-200 text-red-800"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p className="text-sm font-medium">
            Something went wrong. Please try again or contact us directly.
          </p>
        </motion.div>
      )}

      {/* Privacy Notice */}
      <p className="text-xs text-muted-foreground pt-1 text-center">
        By submitting this form, you agree to our privacy policy. We&apos;ll never share your information.
      </p>
    </form>
  );
}
