import {
  ArrowRight,
  Calculator,
  CheckCircle2,
} from "lucide-react";
import { SiteContainer } from "@/components/ui/SiteContainer";
import { Button } from "@/components/ui/Button";
import { TRUST_INDICATORS } from "@/lib/constants";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden section-padding pb-12 sm:pb-16"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-blue-500/[0.06] blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-slate-400/[0.05] blur-3xl" />
      </div>

      <SiteContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="animate-fade-in-up max-w-xl lg:max-w-none">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Work Time Calculator
            </p>

            <h1
              id="hero-heading"
              className="text-[2.125rem] font-bold leading-[1.15] tracking-tight text-foreground sm:text-[2.625rem] lg:text-[3.125rem]"
            >
              Free Hours Calculator
            </h1>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[1.125rem] sm:leading-[1.7]">
              Calculate work hours, overtime, time differences, and total hours
              instantly with our easy-to-use calculator.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a href="#calculator" className="inline-flex">
                <Button variant="primary" size="lg">
                  <Calculator className="h-5 w-5" aria-hidden="true" />
                  Calculate Hours
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </a>
              <a href="#how-it-works" className="inline-flex">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-border pt-8">
              {TRUST_INDICATORS.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-[0.9375rem] text-muted-foreground"
                >
                  <CheckCircle2
                    className="h-[1.125rem] w-[1.125rem] text-success shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-in-up">
            <HeroVisual />
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-md" aria-hidden="true">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Today&apos;s shift</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">7h 30m</p>
          </div>
          <div className="rounded-lg bg-secondary px-3 py-2 text-right">
            <p className="text-xs font-medium text-muted-foreground">Decimal</p>
            <p className="text-sm font-semibold text-foreground">7.50 hrs</p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <TimeBar label="Regular hours" hours={7} max={8} />
          <TimeBar label="Overtime" hours={0.5} max={8} muted />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <MiniStat label="Start" value="9:00 AM" />
          <MiniStat label="Break" value="60 min" />
          <MiniStat label="End" value="5:30 PM" />
        </div>
      </div>
    </div>
  );
}

function TimeBar({
  label,
  hours,
  max,
  muted = false,
}: {
  label: string;
  hours: number;
  max: number;
  muted?: boolean;
}) {
  const pct = Math.min((hours / max) * 100, 100);
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{hours}h</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all duration-500 ${muted ? "bg-muted/50" : "bg-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary/60 px-3 py-3">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
