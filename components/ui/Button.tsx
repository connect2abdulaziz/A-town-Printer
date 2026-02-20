import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants = {
    primary:
      "bg-accent text-accent-foreground hover:bg-accent-hover active:opacity-95 focus-visible:ring-accent shadow-sm hover:shadow-md",
    secondary:
      "bg-muted text-foreground hover:bg-border focus-visible:ring-ring",
    outline:
      "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-ring",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
