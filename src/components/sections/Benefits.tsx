import {
  Briefcase,
  Clock,
  Target,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteContainer } from "@/components/ui/SiteContainer";
import { BENEFITS } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Clock,
  Target,
  Wallet,
  TrendingUp,
  Briefcase,
  Users,
};

export function Benefits() {
  return (
    <section className="section-padding" aria-labelledby="benefits-heading">
      <SiteContainer>
        <SectionHeading
          label="Benefits"
          title="Why Use Our Hours Calculator?"
          subtitle="Whether you're an employee, freelancer, or business owner, accurate time tracking saves money and prevents disputes."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => {
            const Icon = ICON_MAP[benefit.icon] ?? Clock;
            return (
              <Card key={benefit.title} hover>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-[1.0625rem] font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </SiteContainer>
    </section>
  );
}
