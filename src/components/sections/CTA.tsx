import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SiteContainer } from "@/components/ui/SiteContainer";

export function CTA() {
  return (
    <section className="section-padding" aria-labelledby="cta-heading">
      <SiteContainer>
        <div className="rounded-2xl border border-border bg-card px-8 py-14 text-center shadow-sm sm:px-14 sm:py-16">
          <h2
            id="cta-heading"
            className="text-[1.75rem] font-bold tracking-tight text-foreground sm:text-[2.125rem]"
          >
            Start Calculating Your Work Hours Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
            Accurate, instant time calculations for employees, freelancers, and small
            businesses. Free forever — no sign-up required.
          </p>
          <a href="#calculator" className="mt-8 inline-flex">
            <Button variant="primary" size="lg">
              Use Calculator
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </a>
        </div>
      </SiteContainer>
    </section>
  );
}
