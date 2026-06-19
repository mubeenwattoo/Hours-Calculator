import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  label?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
  label,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl sm:mb-14",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {label && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          {label}
        </p>
      )}
      <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground sm:text-[2.125rem] lg:text-[2.375rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem] sm:leading-[1.75]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
