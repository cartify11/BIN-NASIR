import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-amber-900/10 p-3.5 space-y-3 shadow-sm animate-pulse">
      <div className="w-full aspect-square rounded-xl bg-stone-200/80 skeleton-shimmer" />
      <div className="space-y-2 pt-1">
        <div className="h-4 bg-stone-200 rounded-md w-3/4 skeleton-shimmer" />
        <div className="h-3 bg-stone-200 rounded-md w-1/2 skeleton-shimmer" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-5 bg-stone-200 rounded-md w-1/3 skeleton-shimmer" />
        <div className="h-8 bg-stone-200 rounded-xl w-24 skeleton-shimmer" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200/70 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-stone-200 skeleton-shimmer" />
        <div className="space-y-1.5 flex-1">
          <div className="h-4 bg-stone-200 rounded w-1/3 skeleton-shimmer" />
          <div className="h-3 bg-stone-200 rounded w-1/4 skeleton-shimmer" />
        </div>
      </div>
      <div className="h-3 bg-stone-200 rounded w-full skeleton-shimmer" />
      <div className="h-3 bg-stone-200 rounded w-5/6 skeleton-shimmer" />
    </div>
  );
}
