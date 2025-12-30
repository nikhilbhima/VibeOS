import { type FC, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Premium Badge Component
 *
 * Design Philosophy: Subtle indicators with refined polish
 * - Soft backgrounds with matching text
 * - Optional status dot with glow
 * - Icon support for contextual meaning
 */

const variantStyles: Record<BadgeVariant, string> = {
  default: cn(
    'bg-white/[0.06] text-text-secondary',
    'ring-1 ring-inset ring-white/[0.08]'
  ),
  success: cn(
    'bg-emerald-500/10 text-emerald-400',
    'ring-1 ring-inset ring-emerald-500/20'
  ),
  warning: cn(
    'bg-amber-500/10 text-amber-400',
    'ring-1 ring-inset ring-amber-500/20'
  ),
  error: cn(
    'bg-red-500/10 text-red-400',
    'ring-1 ring-inset ring-red-500/20'
  ),
  info: cn(
    'bg-sky-500/10 text-sky-400',
    'ring-1 ring-inset ring-sky-500/20'
  ),
  accent: cn(
    'bg-accent/10 text-accent',
    'ring-1 ring-inset ring-accent/20'
  ),
  outline: cn(
    'bg-transparent text-text-secondary',
    'ring-1 ring-inset ring-border-default'
  ),
};

const dotColors: Record<BadgeVariant, { bg: string; glow: string }> = {
  default: { bg: 'bg-text-muted', glow: '' },
  success: {
    bg: 'bg-emerald-500',
    glow: 'shadow-[0_0_4px_1px_rgba(16,185,129,0.3)]',
  },
  warning: {
    bg: 'bg-amber-500',
    glow: 'shadow-[0_0_4px_1px_rgba(245,158,11,0.3)]',
  },
  error: {
    bg: 'bg-red-500',
    glow: 'shadow-[0_0_4px_1px_rgba(239,68,68,0.3)]',
  },
  info: {
    bg: 'bg-sky-500',
    glow: 'shadow-[0_0_4px_1px_rgba(14,165,233,0.3)]',
  },
  accent: {
    bg: 'bg-accent',
    glow: 'shadow-[0_0_4px_1px_rgba(234,88,12,0.3)]',
  },
  outline: { bg: 'bg-text-muted', glow: '' },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'h-5 px-1.5 text-[10px] gap-1 rounded',
  md: 'h-6 px-2 text-xs gap-1.5 rounded-md',
  lg: 'h-7 px-2.5 text-xs gap-1.5 rounded-md',
};

const dotSizeStyles: Record<BadgeSize, string> = {
  sm: 'h-1 w-1',
  md: 'h-1.5 w-1.5',
  lg: 'h-2 w-2',
};

const iconSizeStyles: Record<BadgeSize, string> = {
  sm: '[&>svg]:h-2.5 [&>svg]:w-2.5',
  md: '[&>svg]:h-3 [&>svg]:w-3',
  lg: '[&>svg]:h-3.5 [&>svg]:w-3.5',
};

export const Badge: FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        'transition-colors duration-150',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'rounded-full flex-shrink-0',
            dotColors[variant].bg,
            dotColors[variant].glow,
            dotSizeStyles[size]
          )}
        />
      )}
      {icon && (
        <span className={cn('flex-shrink-0', iconSizeStyles[size])}>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};

// Badge with close button
interface DismissableBadgeProps extends BadgeProps {
  onDismiss?: () => void;
}

export const DismissableBadge: FC<DismissableBadgeProps> = ({
  onDismiss,
  children,
  className,
  ...props
}) => {
  return (
    <Badge
      {...props}
      className={cn('pr-1', className)}
    >
      {children}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            'ml-0.5 p-0.5 rounded-sm',
            'hover:bg-white/10 transition-colors duration-150',
            'focus:outline-none focus-visible:ring-1 focus-visible:ring-white/20'
          )}
        >
          <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </Badge>
  );
};

// Counter badge (for notifications, etc.)
interface CounterBadgeProps {
  count: number;
  max?: number;
  variant?: 'accent' | 'error' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

export const CounterBadge: FC<CounterBadgeProps> = ({
  count,
  max = 99,
  variant = 'accent',
  size = 'sm',
  className,
}) => {
  if (count <= 0) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  const variants = {
    accent: 'bg-accent text-white',
    error: 'bg-red-500 text-white',
    default: 'bg-bg-elevated text-text-primary ring-1 ring-white/[0.08]',
  };

  const sizes = {
    sm: 'min-w-[16px] h-4 px-1 text-[10px]',
    md: 'min-w-[20px] h-5 px-1.5 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {displayCount}
    </span>
  );
};

// Status badge with animated dot
interface StatusBadgeProps {
  status: 'online' | 'offline' | 'busy' | 'away' | 'connecting';
  label?: string;
  className?: string;
}

export const StatusBadge: FC<StatusBadgeProps> = ({
  status,
  label,
  className,
}) => {
  const statusConfig = {
    online: { label: 'Online', color: 'bg-emerald-500', pulse: false },
    offline: { label: 'Offline', color: 'bg-text-muted', pulse: false },
    busy: { label: 'Busy', color: 'bg-red-500', pulse: false },
    away: { label: 'Away', color: 'bg-amber-500', pulse: false },
    connecting: { label: 'Connecting', color: 'bg-sky-500', pulse: true },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        'text-xs text-text-secondary',
        className
      )}
    >
      <span
        className={cn(
          'h-2 w-2 rounded-full',
          config.color,
          config.pulse && 'animate-pulse'
        )}
      />
      {label || config.label}
    </span>
  );
};

export default Badge;
