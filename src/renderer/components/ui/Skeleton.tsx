import { type FC } from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: number | string;
  height?: number | string;
  lines?: number;
  animated?: boolean;
}

export const Skeleton: FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  animated = true,
}) => {
  const baseStyles = cn(
    'bg-bg-elevated',
    animated && 'animate-shimmer',
    variant === 'circular' && 'rounded-full',
    variant === 'rectangular' && 'rounded-lg',
    variant === 'text' && 'rounded-md'
  );

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseStyles,
              'h-4',
              index === lines - 1 && 'w-3/4' // Last line is shorter
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseStyles, className)}
      style={style}
    />
  );
};

// Pre-built skeleton patterns
interface MessageSkeletonProps {
  className?: string;
}

export const MessageSkeleton: FC<MessageSkeletonProps> = ({ className }) => {
  return (
    <div className={cn('flex gap-3 p-4', className)}>
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width={120} height={14} />
        <Skeleton variant="text" lines={3} />
      </div>
    </div>
  );
};

interface CardSkeletonProps {
  className?: string;
}

export const CardSkeleton: FC<CardSkeletonProps> = ({ className }) => {
  return (
    <div className={cn('p-4 rounded-lg border border-border-subtle', className)}>
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1">
          <Skeleton variant="text" width="60%" height={16} className="mb-2" />
          <Skeleton variant="text" width="40%" height={12} />
        </div>
      </div>
      <Skeleton variant="rectangular" height={120} className="mb-4" />
      <Skeleton variant="text" lines={2} />
    </div>
  );
};

interface FileTreeSkeletonProps {
  count?: number;
  className?: string;
}

export const FileTreeSkeleton: FC<FileTreeSkeletonProps> = ({
  count = 5,
  className,
}) => {
  return (
    <div className={cn('space-y-1', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-2 py-1.5"
          style={{ paddingLeft: `${(index % 3) * 12 + 8}px` }}
        >
          <Skeleton variant="rectangular" width={16} height={16} />
          <Skeleton variant="text" width={`${60 + Math.random() * 40}%`} height={14} />
        </div>
      ))}
    </div>
  );
};

interface ProjectSkeletonProps {
  className?: string;
}

export const ProjectSkeleton: FC<ProjectSkeletonProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center gap-3 p-3 rounded-lg', className)}>
      <Skeleton variant="rectangular" width={40} height={40} className="rounded-lg" />
      <div className="flex-1">
        <Skeleton variant="text" width="70%" height={14} className="mb-1" />
        <Skeleton variant="text" width="50%" height={12} />
      </div>
    </div>
  );
};

interface UsageBarSkeletonProps {
  className?: string;
}

export const UsageBarSkeleton: FC<UsageBarSkeletonProps> = ({ className }) => {
  return (
    <div className={cn('', className)}>
      <div className="flex justify-between mb-1">
        <Skeleton variant="text" width={60} height={12} />
        <Skeleton variant="text" width={40} height={12} />
      </div>
      <Skeleton variant="rectangular" height={8} className="rounded-full" />
    </div>
  );
};

interface PreviewSkeletonProps {
  className?: string;
}

export const PreviewSkeleton: FC<PreviewSkeletonProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* Device frame header */}
      <div className="flex items-center justify-center gap-2 py-2 bg-bg-elevated rounded-t-lg">
        <Skeleton variant="rectangular" width={60} height={24} className="rounded-md" />
        <Skeleton variant="rectangular" width={60} height={24} className="rounded-md" />
        <Skeleton variant="rectangular" width={60} height={24} className="rounded-md" />
      </div>
      {/* Preview content */}
      <div className="flex-1 bg-bg-surface p-4 rounded-b-lg min-h-[300px]">
        <div className="h-full flex items-center justify-center">
          <Skeleton variant="rectangular" width="100%" height="100%" className="min-h-[250px]" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
