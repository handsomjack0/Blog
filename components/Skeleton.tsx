import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md ${className}`} />
  );
};

export const PostDetailSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <Skeleton className="h-64 md:h-96 w-full rounded-none" />
      <div className="p-8 md:p-12 space-y-4">
        <Skeleton className="h-8 w-3/4 mb-6" />
        <div className="space-y-2">
           <Skeleton className="h-4 w-full" />
           <Skeleton className="h-4 w-full" />
           <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="pt-8 mt-8 border-t border-gray-100 dark:border-gray-700">
           <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;