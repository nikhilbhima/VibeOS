import { type FC } from 'react';
import { cn } from '../../lib/utils';

interface StreamingIndicatorProps {
  className?: string;
}

export const StreamingIndicator: FC<StreamingIndicatorProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Animated dots */}
      <div className="flex items-center gap-1">
        <div
          className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
          style={{ animationDelay: '0ms', animationDuration: '600ms' }}
        />
        <div
          className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
          style={{ animationDelay: '150ms', animationDuration: '600ms' }}
        />
        <div
          className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
          style={{ animationDelay: '300ms', animationDuration: '600ms' }}
        />
      </div>

      {/* Status text */}
      <span className="text-sm text-text-muted animate-pulse">
        Claude is thinking...
      </span>
    </div>
  );
};

// Inline typing cursor for streaming text
export const TypingCursor: FC<{ className?: string }> = ({ className }) => (
  <span
    className={cn(
      'inline-block w-0.5 h-4 bg-accent ml-0.5 -mb-0.5',
      'animate-blink',
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

// Activity indicator for tool use
export const ToolUseIndicator: FC<{
  toolName: string;
  status: 'running' | 'completed' | 'error';
  description?: string;
  className?: string;
}> = ({ toolName, status, description, className }) => {
  const statusConfig = {
    running: {
      icon: (
        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ),
      color: 'text-accent',
      bg: 'bg-accent/10',
      border: 'border-accent/20',
    },
    completed: {
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/20',
    },
    error: {
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      color: 'text-error',
      bg: 'bg-error/10',
      border: 'border-error/20',
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2',
        'px-3 py-1.5 rounded-lg',
        config.bg,
        'border',
        config.border,
        className
      )}
    >
      <span className={config.color}>{config.icon}</span>
      <div className="flex flex-col">
        <span className={cn('text-xs font-medium', config.color)}>
          {toolName}
        </span>
        {description && (
          <span className="text-xs text-text-muted">{description}</span>
        )}
      </div>
    </div>
  );
};

export default StreamingIndicator;
