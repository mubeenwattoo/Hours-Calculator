import {
  ArrowLeftRight,
  Calendar,
  DollarSign,
  Repeat,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteContainer } from "@/components/ui/SiteContainer";
import { RELATED_TOOLS } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  ArrowLeftRight,
  TrendingUp,
  DollarSign,
  Repeat,
  Calendar,
};

export function RelatedTools() {
  return (
    <section className="section-padding" aria-labelledby="related-tools-heading">
      <SiteContainer>
        <SectionHeading
          label="Tools"
          title="Related Time Calculators"
          subtitle="More free tools coming soon to help you manage time, payroll, and scheduling."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RELATED_TOOLS.map((tool) => {
            const Icon = ICON_MAP[tool.icon] ?? Repeat;
            return (
              <Card
                key={tool.title}
                className="relative cursor-default opacity-80"
                hover={false}
              >
                {tool.comingSoon && (
                  <Badge className="absolute right-5 top-5">Coming Soon</Badge>
                )}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-[1.0625rem] font-semibold text-foreground">
                  {tool.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
              </Card>
            );
          })}
        </div>
      </SiteContainer>
    </section>
  );
}
