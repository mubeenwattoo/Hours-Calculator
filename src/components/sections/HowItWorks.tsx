import { Coffee, LogIn, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteContainer } from "@/components/ui/SiteContainer";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

const STEP_ICONS = {
  LogIn,
  Coffee,
  Sparkles,
};

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-padding bg-secondary/40"
      aria-labelledby="how-it-works-heading"
    >
      <SiteContainer>
        <SectionHeading
          label="Process"
          title="How It Works"
          subtitle="Calculate your work hours in three simple steps. No learning curve, no complicated setup."
        />

        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[step.icon as keyof typeof STEP_ICONS] ?? Sparkles;
            return (
              <article
                key={step.step}
                className="relative text-center md:text-left"
              >
                <div className="mb-5 flex items-center justify-center gap-4 md:justify-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card shadow-sm">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-[1.125rem] font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div
                    className="pointer-events-none absolute -right-4 top-7 hidden h-px w-8 bg-border md:block lg:w-12"
                    aria-hidden="true"
                  />
                )}
              </article>
            );
          })}
        </div>
      </SiteContainer>
    </section>
  );
}
