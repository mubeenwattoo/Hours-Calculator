import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-secondary/60 px-3 py-1 text-[0.8125rem] font-medium text-secondary-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
