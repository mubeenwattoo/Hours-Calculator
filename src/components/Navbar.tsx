"use client";

import { Clock, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteContainer } from "@/components/ui/SiteContainer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-out",
        scrolled ? "glass border-b border-border shadow-sm" : "bg-background/80",
      )}
    >
      <SiteContainer as="nav" className="flex h-[4.25rem] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[1.125rem] font-bold tracking-tight text-foreground transition-opacity duration-200 hover:opacity-75"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
            <Clock className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
          </span>
          {SITE_NAME}
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href="#calculator"
            className="rounded-lg bg-brand px-5 py-2.5 text-[0.9375rem] font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-px active:translate-y-0"
          >
            Get Started
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            suppressHydrationWarning
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-all duration-200 ease-out hover:bg-secondary active:scale-95"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </SiteContainer>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-[4.25rem] z-40 bg-black/40 animate-backdrop-in md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 right-0 top-full z-50 border-b border-border bg-card shadow-lg animate-menu-in md:hidden">
            <SiteContainer className="py-4">
              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-4 py-3.5 text-base font-medium text-foreground transition-colors duration-200 ease-out hover:bg-secondary"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#calculator"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 block rounded-lg bg-brand px-4 py-3.5 text-center text-base font-semibold text-white transition-all duration-200 ease-out hover:shadow-md active:scale-[0.98]"
                >
                  Get Started
                </a>
              </div>
            </SiteContainer>
          </div>
        </>
      )}
    </header>
  );
}
