import React from 'react';

export const PropertyCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[4/3] bg-slate-200 w-full relative" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="h-4 bg-slate-200 rounded w-20" />
          <div className="h-4 bg-slate-200 rounded w-16" />
        </div>
        
        <div className="h-5 bg-slate-200 rounded w-4/5" />
        <div className="h-4 bg-slate-200 rounded w-2/3" />
        
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-5 bg-slate-200 rounded w-24" />
            <div className="h-3 bg-slate-200 rounded w-16" />
          </div>
          <div className="h-8 bg-slate-200 rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
};

export const PropertyDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-pulse">
      <div className="h-6 bg-slate-200 rounded w-40" />
      
      {/* Hero Image Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-80 sm:h-96">
        <div className="md:col-span-2 bg-slate-200 rounded-2xl h-full" />
        <div className="hidden md:flex flex-col gap-4 h-full">
          <div className="bg-slate-200 rounded-2xl flex-1" />
          <div className="bg-slate-200 rounded-2xl flex-1" />
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
          <div className="h-32 bg-slate-200 rounded-2xl" />
          <div className="h-48 bg-slate-200 rounded-2xl" />
        </div>
        <div className="space-y-4">
          <div className="h-64 bg-slate-200 rounded-2xl" />
          <div className="h-40 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};
