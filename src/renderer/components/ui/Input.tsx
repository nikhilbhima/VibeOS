import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/utils';

type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rightElement?: ReactNode;
  label?: string;
  helperText?: string;
}

/**
 * Premium Input Component
 *
 * Design Philosophy: Refined containers with subtle depth
 * - Inset appearance for tactile feel
 * - Glowing focus states
 * - Smooth transitions throughout
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      error,
      leftIcon,
      rightIcon,
      rightElement,
      label,
      helperText,
      className,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium tracking-[-0.01em]',
              error ? 'text-error' : 'text-text-primary'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {/* Background glow on focus */}
          <div
            className={cn(
              'absolute -inset-px rounded-[calc(8px+1px)] opacity-0 transition-opacity duration-300',
              'group-focus-within:opacity-100',
              error
                ? 'bg-gradient-to-b from-error/20 to-error/5'
                : 'bg-gradient-to-b from-accent/20 to-accent/5'
            )}
          />

          {/* Input wrapper */}
          <div
            className={cn(
              'relative flex items-center',
              'rounded-lg transition-all duration-200',
              // Inset appearance
              'bg-bg-surface',
              'shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(0,0,0,0.1)]',
              // Border
              error
                ? 'ring-1 ring-error/50'
                : 'ring-1 ring-white/[0.06] group-hover:ring-white/[0.1]',
              // Focus state
              'group-focus-within:ring-1',
              error
                ? 'group-focus-within:ring-error'
                : 'group-focus-within:ring-accent/50',
              // Size
              sizeStyles[size],
              // Disabled
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {leftIcon && (
              <div
                className={cn(
                  'flex-shrink-0 text-text-muted transition-colors duration-200',
                  'group-focus-within:text-text-secondary',
                  iconSizeStyles[size],
                  'ml-3'
                )}
              >
                {leftIcon}
              </div>
            )}

            <input
              ref={ref}
              id={inputId}
              className={cn(
                'flex-1 w-full bg-transparent text-text-primary',
                'placeholder:text-text-muted/60',
                'focus:outline-none',
                'disabled:cursor-not-allowed',
                // Size-specific text
                textSizeStyles[size],
                // Padding based on icons
                leftIcon ? 'pl-2' : 'pl-3',
                rightIcon || rightElement ? 'pr-2' : 'pr-3'
              )}
              disabled={disabled}
              aria-invalid={!!error}
              aria-describedby={
                error
                  ? `${inputId}-error`
                  : helperText
                    ? `${inputId}-helper`
                    : undefined
              }
              {...props}
            />

            {rightIcon && !rightElement && (
              <div
                className={cn(
                  'flex-shrink-0 text-text-muted transition-colors duration-200',
                  'group-focus-within:text-text-secondary',
                  iconSizeStyles[size],
                  'mr-3'
                )}
              >
                {rightIcon}
              </div>
            )}

            {rightElement && (
              <div className="flex-shrink-0 mr-1.5">{rightElement}</div>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="flex items-center gap-1.5 text-xs text-error"
          >
            <ErrorIcon className="h-3.5 w-3.5 flex-shrink-0" />
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-xs text-text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Size styles
const sizeStyles: Record<InputSize, string> = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
};

const textSizeStyles: Record<InputSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const iconSizeStyles: Record<InputSize, string> = {
  sm: '[&>svg]:h-3.5 [&>svg]:w-3.5',
  md: '[&>svg]:h-4 [&>svg]:w-4',
  lg: '[&>svg]:h-5 [&>svg]:w-5',
};

// Error icon
const ErrorIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 15A7 7 0 108 1a7 7 0 000 14zm0-9.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 5.5zm0 7a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

// Search Input variant
interface SearchInputProps extends Omit<InputProps, 'leftIcon'> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onClear, ...props }, ref) => {
    const hasValue = value && String(value).length > 0;

    return (
      <Input
        ref={ref}
        value={value}
        leftIcon={<SearchIcon />}
        rightElement={
          hasValue && onClear ? (
            <button
              type="button"
              onClick={onClear}
              className={cn(
                'p-1 rounded-md text-text-muted',
                'hover:text-text-primary hover:bg-bg-hover',
                'transition-colors duration-150'
              )}
            >
              <ClearIcon className="h-3.5 w-3.5" />
            </button>
          ) : undefined
        }
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';

// Icons
const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.5 11.5L14 14M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
    />
  </svg>
);

const ClearIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 15A7 7 0 108 1a7 7 0 000 14zm2.78-9.78a.75.75 0 010 1.06L9.06 8l1.72 1.72a.75.75 0 11-1.06 1.06L8 9.06l-1.72 1.72a.75.75 0 01-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 011.06-1.06L8 6.94l1.72-1.72a.75.75 0 011.06 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default Input;
