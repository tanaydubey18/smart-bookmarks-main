import * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

/**
 * Reusable button component with sane defaults.
 * Keeps styling centralized for a consistent UI.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", loading = false, className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed h-9 px-4 py-2";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 focus-visible:ring-zinc-900",
      secondary:
        "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-300",
      ghost:
        "bg-transparent text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-300",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";

