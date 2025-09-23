import React from 'react';
import { Card } from "./Card";

const SkeletonLine = ({ width = '100%', height = '1rem' }) => (
    <div
      className="bg-card-bg/80 rounded animate-pulse"
      style={{ width, height }}
    />
  );
  
  const SkeletonLoader = () => {
    return (
      <Card className="space-y-8">
        {/* Score Skeleton */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-40 h-40 bg-card-bg/80 rounded-full animate-pulse" />
          <SkeletonLine width="50%" height="1.5rem" />
          <SkeletonLine width="80%" />
        </div>
  
        {/* Keywords Skeleton */}
        <div className="space-y-4">
          <SkeletonLine width="60%" height="1.5rem" />
          <div className="flex flex-wrap gap-2">
            <SkeletonLine width="80px" height="1.75rem" />
            <SkeletonLine width="120px" height="1.75rem" />
            <SkeletonLine width="100px" height="1.75rem" />
            <SkeletonLine width="90px" height="1.75rem" />
          </div>
          <div className="flex flex-wrap gap-2">
            <SkeletonLine width="100px" height="1.75rem" />
            <SkeletonLine width="70px" height="1.75rem" />
            <SkeletonLine width="110px" height="1.75rem" />
          </div>
        </div>
  
        {/* Feedback Skeleton */}
        <div className="space-y-3">
           <SkeletonLine width="70%" height="1.5rem" />
           <SkeletonLine width="100%" height="3.5rem" />
           <SkeletonLine width="100%" height="3.5rem" />
           <SkeletonLine width="100%" height="3.5rem" />
        </div>
      </Card>
    );
  };
  
  export default SkeletonLoader;
