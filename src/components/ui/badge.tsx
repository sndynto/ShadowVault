"use client";

import React, { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-orange-500/20 text-orange-300 border border-orange-500/50",
        secondary: "bg-slate-500/20 text-slate-300 border border-slate-500/50",
        success: "bg-green-500/20 text-green-300 border border-green-500/50",
        warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50",
        error: "bg-red-500/20 text-red-300 border border-red-500/50",
        cyan: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50",
        bronze: "bg-amber-900/30 text-amber-400 border border-amber-500/50",
        silver: "bg-gray-700/30 text-gray-300 border border-gray-500/50",
        gold: "bg-yellow-600/30 text-yellow-300 border border-yellow-500/50",
        whale: "bg-orange-600/30 text-orange-300 border border-orange-500/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
