import {
  CheckCircle,
  Gift,
  Heart,
  Shield,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteContainer } from "@/components/ui/SiteContainer";
import { FEATURES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Smartphone,
  Shield,
  Gift,
  CheckCircle,
  Heart,
};

export function Features() {
  return (
    <section
      id="features"
      className="section-padding bg-secondary/40"
      aria-labelledby="features-heading"
    >
      <SiteContainer>
        <SectionHeading
          label="Features"
          title="Powerful Features, Zero Complexity"
          subtitle="Everything you need for accurate time tracking, built into one free, easy-to-use tool."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = ICON_MAP[feature.icon] ?? Zap;
            return (
              <Card key={feature.title} hover className="group">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white transition-transform duration-200 ease-out group-hover:scale-105">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-[1.0625rem] font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </SiteContainer>
    </section>
  );
}
