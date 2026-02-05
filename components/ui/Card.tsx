import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
