import { Clock } from "lucide-react";
import Link from "next/link";
import { SiteContainer } from "@/components/ui/SiteContainer";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <SiteContainer className="section-padding !py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 text-[1.125rem] font-bold text-foreground transition-opacity duration-200 hover:opacity-75">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
                <Clock className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
              </span>
              {SITE_NAME}
            </Link>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
              Free hours calculator for work time, overtime, and break tracking.
              Accurate, instant results with no registration required.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.9375rem] text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#features"
                  className="text-[0.9375rem] text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="text-[0.9375rem] text-muted-foreground cursor-default">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-[0.9375rem] text-muted-foreground cursor-default">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-[0.9375rem] text-muted-foreground">
            &copy; {CURRENT_YEAR} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Calculations are for informational purposes. Verify with your employer
            or local labor laws.
          </p>
        </div>
      </SiteContainer>
    </footer>
  );
}
