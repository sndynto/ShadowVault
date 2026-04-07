"use client";

import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = "md", fullScreen = false, ...props }, ref) => {
    const sizeMap = {
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    };

    if (fullScreen) {
      return (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          ref={ref}
        >
          <div className={cn("animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500", sizeMap[size], className)} {...props} />
        </div>
      );
    }

    return (
      <div
        className={cn("animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500", sizeMap[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Loader.displayName = "Loader";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "animate-pulse rounded-lg bg-gradient-to-r from-slate-700/50 to-slate-800/50",
        className
      )}
      {...props}
    />
  )
);

Skeleton.displayName = "Skeleton";

type SkeletonLoaderProps = HTMLAttributes<HTMLDivElement> & {
  lines?: number;
};

const SkeletonLoader = React.forwardRef<HTMLDivElement, SkeletonLoaderProps>(
  ({ className, lines = 3, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-3", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  )
);

SkeletonLoader.displayName = "SkeletonLoader";

export { Loader, Skeleton, SkeletonLoader };
