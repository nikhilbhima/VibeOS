import { type FC, type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

/**
 * Premium Button Component
 *
 * Design Philosophy: Refined luxury with tactile feedback
 * - Primary: Warm gradient with inner luminosity
 * - Secondary: Frosted glass with subtle depth
 * - Ghost: Invisible until interaction reveals it
 * - Danger: Sophisticated warning, not alarming
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const isIconOnly = (size === 'icon-sm' || size === 'icon-md' || size === 'icon-lg') && !children;

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center font-medium',
          'transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'focus-visible:ring-offset-bg-base',
          'disabled:pointer-events-none',

          // Variant styles
          variants[variant],

          // Size styles
          sizes[size],

          // Icon-only perfect circle
          isIconOnly && 'aspect-square p-0',

          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {/* Gradient overlay for primary variant */}
        {variant === 'primary' && (
          <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />
        )}

        {/* Glass reflection for secondary variant */}
        {variant === 'secondary' && (
          <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
        )}

        {/* Content wrapper */}
        <span className={cn(
          'relative z-10 inline-flex items-center justify-center',
          isLoading && 'opacity-0'
        )}>
          {leftIcon && (
            <span className={cn(
              'flex-shrink-0',
              children && 'mr-2',
              iconSizes[size]
            )}>
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className={cn(
              'flex-shrink-0',
              children && 'ml-2',
              iconSizes[size]
            )}>
              {rightIcon}
            </span>
          )}
        </span>

        {/* Premium loading spinner */}
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size={size} variant={variant} />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Variant styles with premium refinements
const variants: Record<ButtonVariant, string> = {
  primary: cn(
    // Warm gradient base
    'bg-gradient-to-b from-[hsl(25,90%,52%)] to-[hsl(25,85%,45%)]',
    'text-white font-semibold tracking-[-0.01em]',
    // Subtle inner shadow for depth
    'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_1px_2px_0_rgba(0,0,0,0.15),0_2px_8px_-2px_rgba(234,88,12,0.35)]',
    // Hover: lift and glow
    'hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_12px_-2px_rgba(234,88,12,0.45),0_0_20px_-5px_rgba(234,88,12,0.3)]',
    'hover:translate-y-[-1px]',
    // Active: press down
    'active:translate-y-[0.5px]',
    'active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.15),0_1px_2px_0_rgba(0,0,0,0.1)]',
    // Focus
    'focus-visible:ring-accent/50',
    // Disabled
    'disabled:opacity-40 disabled:saturate-50'
  ),

  secondary: cn(
    // Frosted glass effect
    'bg-bg-elevated/80 backdrop-blur-md',
    'text-text-primary',
    // Refined border with gradient
    'border border-white/[0.08]',
    'shadow-[0_0_0_1px_rgba(0,0,0,0.3),0_1px_2px_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.04)]',
    // Hover: brighten
    'hover:bg-bg-elevated hover:border-white/[0.12]',
    'hover:shadow-[0_0_0_1px_rgba(0,0,0,0.3),0_2px_8px_-2px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.06)]',
    // Active
    'active:bg-bg-surface',
    // Focus
    'focus-visible:ring-white/20',
    // Disabled
    'disabled:opacity-50'
  ),

  ghost: cn(
    // Invisible until interaction
    'bg-transparent',
    'text-text-secondary',
    // Hover: subtle reveal
    'hover:bg-white/[0.06] hover:text-text-primary',
    // Active
    'active:bg-white/[0.04]',
    // Focus
    'focus-visible:ring-white/20',
    // Disabled
    'disabled:opacity-50'
  ),

  outline: cn(
    // Clean outline
    'bg-transparent',
    'text-text-primary',
    'border border-border-default',
    // Hover
    'hover:bg-bg-hover hover:border-border-strong',
    // Active
    'active:bg-bg-surface',
    // Focus
    'focus-visible:ring-white/20',
    // Disabled
    'disabled:opacity-50'
  ),

  danger: cn(
    // Sophisticated red, not alarming
    'bg-gradient-to-b from-[hsl(0,65%,48%)] to-[hsl(0,70%,42%)]',
    'text-white font-semibold',
    // Depth
    'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_1px_2px_0_rgba(0,0,0,0.15),0_2px_8px_-2px_rgba(220,38,38,0.3)]',
    // Hover
    'hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_4px_12px_-2px_rgba(220,38,38,0.4)]',
    'hover:translate-y-[-1px]',
    // Active
    'active:translate-y-[0.5px]',
    'active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]',
    // Focus
    'focus-visible:ring-red-500/50',
    // Disabled
    'disabled:opacity-40 disabled:saturate-50'
  ),
};

// Size configurations
const sizes: Record<ButtonSize, string> = {
  xs: 'h-6 px-2 text-xs gap-1 rounded-md',
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-9 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-5 text-base gap-2.5 rounded-xl',
  'icon-sm': 'h-7 w-7 rounded-lg',
  'icon-md': 'h-9 w-9 rounded-lg',
  'icon-lg': 'h-11 w-11 rounded-xl',
};

const iconSizes: Record<ButtonSize, string> = {
  xs: '[&>svg]:h-3 [&>svg]:w-3',
  sm: '[&>svg]:h-3.5 [&>svg]:w-3.5',
  md: '[&>svg]:h-4 [&>svg]:w-4',
  lg: '[&>svg]:h-5 [&>svg]:w-5',
  'icon-sm': '[&>svg]:h-4 [&>svg]:w-4',
  'icon-md': '[&>svg]:h-4 [&>svg]:w-4',
  'icon-lg': '[&>svg]:h-5 [&>svg]:w-5',
};

// Premium loading spinner
const LoadingSpinner: FC<{ size: ButtonSize; variant: ButtonVariant }> = ({ size, variant }) => {
  const spinnerSize = {
    xs: 'h-3 w-3',
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
    'icon-sm': 'h-4 w-4',
    'icon-md': 'h-4 w-4',
    'icon-lg': 'h-5 w-5',
  }[size];

  const spinnerColor = variant === 'primary' || variant === 'danger'
    ? 'text-white'
    : 'text-text-primary';

  return (
    <svg
      className={cn('animate-spin', spinnerSize, spinnerColor)}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Track */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-20"
      />
      {/* Spinner arc */}
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Button Group for connected buttons
interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ children, className }) => (
  <div
    className={cn(
      'inline-flex',
      // Connected button styling
      '[&>button]:rounded-none',
      '[&>button:first-child]:rounded-l-lg',
      '[&>button:last-child]:rounded-r-lg',
      '[&>button:not(:last-child)]:border-r-0',
      // Divider between buttons
      '[&>button:not(:first-child)]:border-l [&>button:not(:first-child)]:border-l-white/10',
      className
    )}
  >
    {children}
  </div>
);

export default Button;
