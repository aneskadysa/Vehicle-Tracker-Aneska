import * as React from "react";
import { cn } from "../../lib/utils"; // opsional

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Badge = ({ className, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium bg-gray-200 text-gray-900",
        className
      )}
      {...props}
    />
  );
};
