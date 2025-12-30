import { type FC } from 'react';
import { cn } from '../../lib/utils';

interface StreamingIndicatorProps {
  className?: string;
}

/**
 * Premium StreamingIndicator Component
 *
 * Design Philosophy: Elegant loading state
 * - Smooth wave animation for dots
 * - Glass-morphism container
 * - Subtle pulsing text
 */
export const StreamingIndicator: FC<StreamingIndicatorProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3',
        'px-4 py-2.5 rounded-xl',
        'bg-white/[0.03]',
        'ring-1 ring-inset ring-white/[0.06]',
        className
      )}
    >
      {/* Animated dots with wave effect */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'w-2 h-2 rounded-full',
              'bg-gradient-to-br from-accent to-accent/60',
              'shadow-[0_0_6px_0_rgba(234,88,12,0.4)]'
            )}
            style={{
              animation: 'bounce 1s ease-in-out infinite',
              animationDelay: `${i * 150}ms`,
            }}
          />
        ))}
      </div>

      {/* Status text */}
      <span className="text-sm text-text-secondary">
        Claude is thinking...
      </span>
    </div>
  );
};

// Premium typing cursor for streaming text
export const TypingCursor: FC<{ className?: string }> = ({ className }) => (
  <span
    className={cn(
      'inline-block w-0.5 h-[1.1em] ml-0.5 -mb-0.5',
      'bg-gradient-to-b from-accent to-accent/60',
      'rounded-full',
      'animate-pulse',
      className
    )}
  />
);

// Streaming text wrapper with cursor
export const StreamingText: FC<{
  content: string;
  isComplete?: boolean;
  className?: string;
}> = ({ content, isComplete = false, className }) => (
  <span className={className}>
    {content}
    {!isComplete && <TypingCursor />}
  </span>
);

// Premium activity indicator for tool use
export const ToolUseIndicator: FC<{
  toolName: string;
  status: 'running' | 'completed' | 'error';
  description?: string;
  className?: string;
}> = ({ toolName, status, description, className }) => {
  const statusConfig = {
    running: {
      icon: <SpinnerIcon className="w-3.5 h-3.5 animate-spin" />,
      color: 'text-accent',
      bg: 'bg-accent/10',
      ring: 'ring-accent/20',
      glow: 'shadow-[0_0_8px_0_rgba(234,88,12,0.2)]',
    },
    completed: {
      icon: <CheckIcon className="w-3.5 h-3.5" />,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      ring: 'ring-emerald-500/20',
      glow: '',
    },
    error: {
      icon: <XIcon className="w-3.5 h-3.5" />,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      ring: 'ring-red-500/20',
      glow: '',
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5',
        'px-3 py-2 rounded-lg',
        config.bg,
        'ring-1 ring-inset',
        config.ring,
        config.glow,
        'transition-all duration-200',
        className
      )}
    >
      <span className={config.color}>{config.icon}</span>
      <div className="flex flex-col gap-0.5">
        <span className={cn('text-xs font-medium', config.color)}>
          {toolName}
        </span>
        {description && (
          <span className="text-[11px] text-text-muted leading-tight">
            {description}
          </span>
        )}
      </div>
    </div>
  );
};

// Spinner icon
const SpinnerIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Check icon
const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// X icon
const XIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default StreamingIndicator;
