import { type TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  helperText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const resizeStyles: Record<string, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

/**
 * Premium Textarea Component
 *
 * Design Philosophy: Matches Input component aesthetics
 * - Inset appearance with inner shadows
 * - Glowing focus states
 * - Smooth transitions
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error,
      label,
      helperText,
      resize = 'vertical',
      className,
      disabled,
      id,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label
            htmlFor={textareaId}
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

          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            className={cn(
              'relative w-full text-sm text-text-primary',
              'px-3 py-2.5 rounded-lg',
              // Inset appearance
              'bg-bg-surface',
              'shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(0,0,0,0.1)]',
              // Border
              error
                ? 'ring-1 ring-error/50'
                : 'ring-1 ring-white/[0.06] hover:ring-white/[0.1]',
              // Focus state
              'focus:ring-1',
              error
                ? 'focus:ring-error'
                : 'focus:ring-accent/50',
              'focus:outline-none',
              // Placeholder
              'placeholder:text-text-muted/60',
              // Transitions
              'transition-all duration-200',
              // Disabled
              'disabled:opacity-50 disabled:cursor-not-allowed',
              // Resize
              resizeStyles[resize]
            )}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${textareaId}-error`
                : helperText
                  ? `${textareaId}-helper`
                  : undefined
            }
            {...props}
          />
        </div>

        {/* Error message */}
        {error && (
          <p
            id={`${textareaId}-error`}
            className="flex items-center gap-1.5 text-xs text-error"
          >
            <ErrorIcon className="h-3.5 w-3.5 flex-shrink-0" />
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="text-xs text-text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

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

export default Textarea;
