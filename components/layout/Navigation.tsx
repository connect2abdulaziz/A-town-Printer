"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { serviceCategories } from "@/lib/data/services";

const mainNavLinks = [
  ...serviceCategories.map((c) => ({ href: `/${c.slug}`, label: c.navLabel })),
  { href: "/quote", label: "Quote" },
  { href: "/upload", label: "Upload" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
        {mainNavLinks.map(({ href, label }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors hover:text-accent rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
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
