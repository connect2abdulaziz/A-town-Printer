"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type QuoteFormProps = { product?: string };

export default function QuoteForm({ product }: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    const form = e.currentTarget;
    try {
      const formData = new FormData(form);
      const payload: Record<string, string> = Object.fromEntries(
        formData.entries() as IterableIterator<[string, string]>
      );
      if (product) payload.product = product;

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const statusCode = res.status;
      const data = await res.json().catch(() => ({}));

      const isSuccess =
        statusCode === 201 ||
        statusCode === 200 ||
        (statusCode >= 200 && statusCode < 300) ||
        Boolean(data?.id);

      if (isSuccess) {
        try {
          form.reset();
        } catch {
          // ignore reset errors
        }
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {product && <input type="hidden" name="product" value={product} />}
      {/* Row 1: Name and Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-semibold text-accent">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-accent placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-semibold text-accent">
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-accent placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Row 2: Phone and Category */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-sm font-semibold text-accent">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-accent placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 transition-colors"
            placeholder="+44 123 456 7890"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="category" className="block text-sm font-semibold text-accent">
            Service Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-accent focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 transition-colors"
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
        <label htmlFor="project-details" className="block text-sm font-semibold text-accent">
          Project Details <span className="text-accent">*</span>
        </label>
        <textarea
          id="project-details"
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-accent placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 transition-colors resize-none"
          placeholder="Tell us about your project, quantity, specifications, and any special requirements..."
        />
      </div>

      {/* Row 4: Quantity */}
      <div className="space-y-1.5">
        <label htmlFor="quantity" className="block text-sm font-semibold text-accent">
          Estimated Quantity
        </label>
        <input
          id="quantity"
          name="quantity"
          type="text"
          className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-accent placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 transition-colors"
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

      {/* Success Message */}
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm font-medium text-success"
        >
          <CheckCircle className="h-4 w-4 shrink-0" />
          Quote submitted successfully.
        </motion.p>
      )}

      {/* Error Message */}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border-2 border-red-200 text-red-800"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p className="text-sm font-medium">
            {errorMessage ?? "Something went wrong. Please try again or contact us directly."}
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
