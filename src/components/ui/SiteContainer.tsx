import { cn } from "@/lib/utils";

interface SiteContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "nav" | "section";
  narrow?: boolean;
}

export function SiteContainer({
  children,
  className,
  as: Tag = "div",
  narrow = false,
}: SiteContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        narrow ? "max-w-4xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
