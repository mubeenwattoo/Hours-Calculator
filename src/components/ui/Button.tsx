import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        suppressHydrationWarning
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          variant === "primary" &&
            "bg-brand text-white shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
          variant === "secondary" &&
            "bg-secondary text-secondary-foreground hover:bg-border hover:-translate-y-px active:translate-y-0",
          variant === "outline" &&
            "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary hover:-translate-y-px active:translate-y-0",
          variant === "ghost" &&
            "text-foreground hover:bg-secondary active:scale-[0.98]",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-5 py-2.5 text-[0.9375rem]",
          size === "lg" && "px-7 py-3.5 text-base",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
