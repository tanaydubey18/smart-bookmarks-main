import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "outline";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "default", loading = false, className, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]";
    
    const sizes = {
      default: "h-11 px-6",
      sm: "h-9 px-4",
      lg: "h-14 px-10 text-lg",
      icon: "h-10 w-10",
    };

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-foreground text-background hover:shadow-xl premium-shadow hover:premium-shadow-hover btn-shine",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/50 shadow-sm",
      ghost:
        "bg-transparent text-foreground hover:bg-secondary",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 shadow-sm",
      outline:
        "border border-border/60 bg-transparent hover:bg-secondary text-foreground shadow-sm hover:shadow-md",
    };

    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
