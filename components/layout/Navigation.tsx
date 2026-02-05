"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/clothing", label: "Clothing & Apparel" },
  { href: "/large-format", label: "Large Format" },
  { href: "/print-marketing", label: "Print Marketing" },
  { href: "/quote", label: "Quote" },
  { href: "/upload", label: "Upload" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
        {links.map(({ href, label }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
