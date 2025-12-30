import { type FC, type ImgHTMLAttributes, useState, Children } from 'react';
import { cn } from '../../lib/utils';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  size?: AvatarSize;
  name?: string;
  src?: string;
  fallback?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

/**
 * Premium Avatar Component
 *
 * Design Philosophy: Refined circular elements with depth
 * - Subtle ring for definition
 * - Status indicators with glow
 * - Gradient fallbacks based on name
 */

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-xl',
};

const statusSizeStyles: Record<AvatarSize, string> = {
  xs: 'h-1.5 w-1.5 border',
  sm: 'h-2 w-2 border-[1.5px]',
  md: 'h-2.5 w-2.5 border-2',
  lg: 'h-3 w-3 border-2',
  xl: 'h-4 w-4 border-2',
};

const statusPositionStyles: Record<AvatarSize, string> = {
  xs: 'bottom-0 right-0',
  sm: 'bottom-0 right-0',
  md: 'bottom-0.5 right-0.5',
  lg: 'bottom-0.5 right-0.5',
  xl: 'bottom-1 right-1',
};

const statusColors: Record<string, { bg: string; glow: string }> = {
  online: {
    bg: 'bg-emerald-500',
    glow: 'shadow-[0_0_6px_1px_rgba(16,185,129,0.4)]',
  },
  offline: {
    bg: 'bg-text-muted',
    glow: '',
  },
  busy: {
    bg: 'bg-red-500',
    glow: 'shadow-[0_0_6px_1px_rgba(239,68,68,0.4)]',
  },
  away: {
    bg: 'bg-amber-500',
    glow: 'shadow-[0_0_6px_1px_rgba(245,158,11,0.4)]',
  },
};

// Warm gradient palette
const gradients = [
  'from-rose-500 to-pink-600',
  'from-orange-500 to-amber-600',
  'from-amber-500 to-yellow-600',
  'from-emerald-500 to-teal-600',
  'from-teal-500 to-cyan-600',
  'from-cyan-500 to-blue-600',
  'from-blue-500 to-indigo-600',
  'from-indigo-500 to-purple-600',
  'from-purple-500 to-fuchsia-600',
  'from-fuchsia-500 to-pink-600',
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function getGradientFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export const Avatar: FC<AvatarProps> = ({
  size = 'md',
  name,
  src,
  fallback,
  status,
  className,
  alt,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const showImage = src && !imageError;
  const initials = name ? getInitials(name) : fallback || '?';
  const gradient = name ? getGradientFromName(name) : 'from-gray-500 to-gray-600';

  return (
    <div className={cn('relative inline-flex', className)}>
      <div
        className={cn(
          'relative flex items-center justify-center rounded-full overflow-hidden',
          // Ring for definition
          'ring-1 ring-white/[0.08]',
          // Shadow for depth
          'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]',
          sizeStyles[size]
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
            {...props}
          />
        ) : (
          <div
            className={cn(
              'h-full w-full flex items-center justify-center bg-gradient-to-br',
              gradient
            )}
          >
            <span className="font-semibold text-white tracking-tight select-none">
              {initials}
            </span>
          </div>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute rounded-full border-bg-base',
            statusColors[status].bg,
            statusColors[status].glow,
            statusSizeStyles[size],
            statusPositionStyles[size]
          )}
        />
      )}
    </div>
  );
};

// Claude-specific avatar with brand identity
interface ClaudeAvatarProps {
  size?: AvatarSize;
  className?: string;
  animated?: boolean;
}

export const ClaudeAvatar: FC<ClaudeAvatarProps> = ({
  size = 'md',
  className,
  animated = false,
}) => {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full overflow-hidden',
        // Warm orange gradient
        'bg-gradient-to-br from-[hsl(25,90%,50%)] to-[hsl(20,85%,42%)]',
        // Ring and shadow
        'ring-1 ring-white/10',
        'shadow-[0_2px_8px_-2px_rgba(234,88,12,0.35),inset_0_1px_0_0_rgba(255,255,255,0.15)]',
        sizeStyles[size],
        className
      )}
    >
      {/* Inner glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10" />

      {/* Claude logo mark - stylized C */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cn(
          'relative h-[55%] w-[55%] text-white',
          animated && 'animate-pulse'
        )}
      >
        <path
          d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
          fill="currentColor"
        />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
};

// Avatar group for stacked display
interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarSize;
  className?: string;
}

export const AvatarGroup: FC<AvatarGroupProps> = ({
  children,
  max,
  size = 'md',
  className,
}) => {
  const avatars = Children.toArray(children);
  const displayed = max ? avatars.slice(0, max) : avatars;
  const remaining = max ? avatars.length - max : 0;

  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {displayed.map((avatar, index) => (
        <div
          key={index}
          className="relative ring-2 ring-bg-base rounded-full"
          style={{ zIndex: displayed.length - index }}
        >
          {avatar}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'relative flex items-center justify-center rounded-full',
            'bg-bg-elevated text-text-secondary ring-2 ring-bg-base',
            'font-medium',
            sizeStyles[size]
          )}
          style={{ zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default Avatar;
