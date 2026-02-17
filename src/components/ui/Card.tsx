import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Simple card container used to group related content.
 */
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-slate-100 bg-white shadow-sm",
        className
      )}
      {...props}
    />
  );
}


