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

/**
 * Premium Skeleton Component
 *
 * Design Philosophy: Subtle, refined loading states
 * - Gradient shimmer effect that sweeps across
 * - Multiple pre-built patterns for common UI elements
 * - Smooth, non-distracting animation
 */
export const Skeleton: FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  animated = true,
}) => {
  const baseStyles = cn(
    'relative overflow-hidden',
    'bg-gradient-to-r from-bg-elevated via-bg-hover to-bg-elevated bg-[length:200%_100%]',
    animated && 'animate-[shimmer_2s_ease-in-out_infinite]',
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
              index === lines - 1 && 'w-3/4'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
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
  variant?: 'user' | 'assistant';
}

export const MessageSkeleton: FC<MessageSkeletonProps> = ({ className, variant = 'assistant' }) => {
  return (
    <div className={cn(
      'flex gap-3 py-4',
      variant === 'user' && 'flex-row-reverse',
      className
    )}>
      <Skeleton variant="circular" width={36} height={36} />
      <div className={cn(
        'flex-1 max-w-[70%] space-y-2',
        variant === 'user' && 'flex flex-col items-end'
      )}>
        <Skeleton variant="text" width={100} height={12} />
        <div className={cn(
          'rounded-2xl overflow-hidden',
          variant === 'user' ? 'bg-accent/5' : 'bg-bg-surface'
        )}>
          <div className="p-4 space-y-2">
            <Skeleton variant="text" lines={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface CardSkeletonProps {
  className?: string;
}

export const CardSkeleton: FC<CardSkeletonProps> = ({ className }) => {
  return (
    <div className={cn(
      'p-4 rounded-xl bg-bg-surface/50 border border-white/[0.06]',
      'shadow-[0_0_0_1px_rgba(0,0,0,0.2)]',
      className
    )}>
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circular" width={44} height={44} />
        <div className="flex-1 space-y-1.5">
          <Skeleton variant="text" width="55%" height={16} />
          <Skeleton variant="text" width="35%" height={12} />
        </div>
      </div>
      <Skeleton variant="rectangular" height={100} className="mb-4 rounded-lg" />
      <Skeleton variant="text" lines={2} />
    </div>
  );
};

interface FileTreeSkeletonProps {
  count?: number;
  className?: string;
}

export const FileTreeSkeleton: FC<FileTreeSkeletonProps> = ({
  count = 6,
  className,
}) => {
  const depths = [0, 1, 1, 2, 1, 0]; // Simulated tree depth

  return (
    <div className={cn('space-y-0.5', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-2 py-1.5 px-2 rounded-md"
          style={{
            paddingLeft: `${depths[index % depths.length] * 16 + 8}px`,
            animationDelay: `${index * 50}ms`,
          }}
        >
          <Skeleton variant="rectangular" width={16} height={16} className="rounded" />
          <Skeleton
            variant="text"
            width={`${50 + Math.random() * 50}%`}
            height={14}
          />
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
    <div className={cn(
      'flex items-center gap-3 p-3 rounded-lg',
      'bg-bg-surface/30',
      className
    )}>
      <Skeleton
        variant="rectangular"
        width={40}
        height={40}
        className="rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0 space-y-1.5">
        <Skeleton variant="text" width="65%" height={14} />
        <Skeleton variant="text" width="40%" height={11} />
      </div>
      <Skeleton variant="rectangular" width={20} height={20} className="rounded" />
    </div>
  );
};

interface UsageBarSkeletonProps {
  className?: string;
}

export const UsageBarSkeleton: FC<UsageBarSkeletonProps> = ({ className }) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex justify-between">
        <Skeleton variant="text" width={50} height={11} />
        <Skeleton variant="text" width={35} height={11} />
      </div>
      <Skeleton variant="rectangular" height={6} className="rounded-full" />
    </div>
  );
};

interface PreviewSkeletonProps {
  className?: string;
}

export const PreviewSkeleton: FC<PreviewSkeletonProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-col rounded-xl overflow-hidden', className)}>
      {/* Device frame header */}
      <div className="flex items-center justify-center gap-2 py-3 bg-bg-elevated border-b border-white/[0.04]">
        <Skeleton variant="rectangular" width={56} height={26} className="rounded-md" />
        <Skeleton variant="rectangular" width={56} height={26} className="rounded-md" />
        <Skeleton variant="rectangular" width={56} height={26} className="rounded-md" />
      </div>
      {/* Preview content */}
      <div className="flex-1 bg-bg-surface p-6 min-h-[320px] flex flex-col gap-4">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width={120} height={20} />
          <div className="flex gap-2">
            <Skeleton variant="rectangular" width={32} height={32} className="rounded-lg" />
            <Skeleton variant="rectangular" width={32} height={32} className="rounded-lg" />
          </div>
        </div>
        {/* Content area */}
        <div className="flex-1 grid grid-cols-3 gap-4">
          <Skeleton variant="rectangular" className="col-span-2 rounded-xl" />
          <div className="space-y-3">
            <Skeleton variant="rectangular" height={80} className="rounded-lg" />
            <Skeleton variant="rectangular" height={80} className="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChatInputSkeletonProps {
  className?: string;
}

export const ChatInputSkeleton: FC<ChatInputSkeletonProps> = ({ className }) => {
  return (
    <div className={cn(
      'rounded-xl border border-white/[0.06] bg-bg-surface/50 overflow-hidden',
      className
    )}>
      <div className="p-4">
        <Skeleton variant="text" width="30%" height={16} />
      </div>
      <div className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.04]">
        <Skeleton variant="rectangular" width={24} height={24} className="rounded-md" />
        <Skeleton variant="rectangular" width={24} height={24} className="rounded-md" />
        <div className="flex-1" />
        <Skeleton variant="rectangular" width={80} height={32} className="rounded-lg" />
      </div>
    </div>
  );
};

export default Skeleton;
