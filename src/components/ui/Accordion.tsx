import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="rounded-xl border border-border bg-card px-6 shadow-sm sm:px-7">
      {items.map((item, index) => (
        <details
          key={item.question}
          className="group border-b border-border last:border-b-0"
          open={index === 0}
        >
          <summary
            suppressHydrationWarning
            className={cn(
              "flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5",
              "text-[1.0625rem] font-semibold text-foreground transition-colors duration-200 ease-out",
              "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "[&::-webkit-details-marker]:hidden",
            )}
          >
            <span>{item.question}</span>
            <ChevronDown
              className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="pb-5">
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
