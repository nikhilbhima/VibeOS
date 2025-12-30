import { type FC, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { type MockMessage } from '../../lib/mock-data';
import MessageItem from './MessageItem';
import StreamingIndicator from './StreamingIndicator';

interface MessageListProps {
  messages: MockMessage[];
  isStreaming?: boolean;
  className?: string;
}

/**
 * Premium MessageList Component
 *
 * Design Philosophy: Elegant conversation flow
 * - Custom scrollbar with accent glow
 * - Gradient fade masks at edges
 * - Refined spacing and grouping
 * - Smooth scroll behavior
 */
export const MessageList: FC<MessageListProps> = ({
  messages,
  isStreaming = false,
  className,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  return (
    <div className={cn('relative flex-1 overflow-hidden', className)}>
      {/* Top fade gradient */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-8 z-10',
          'bg-gradient-to-b from-bg-base to-transparent',
          'pointer-events-none'
        )}
      />

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className={cn(
          'h-full overflow-y-auto overflow-x-hidden',
          'scroll-smooth',
          // Custom scrollbar
          'scrollbar-thin scrollbar-track-transparent',
          'scrollbar-thumb-white/[0.08] hover:scrollbar-thumb-white/[0.12]'
        )}
      >
        {/* Messages container with max-width for readability */}
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-1">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            messages.map((message, index) => (
              <MessageItem
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1}
                showAvatar={
                  index === 0 || messages[index - 1].role !== message.role
                }
              />
            ))
          )}

          {/* Streaming indicator */}
          {isStreaming && (
            <div
              className={cn(
                'flex items-start gap-3 py-4',
                'animate-in fade-in slide-in-from-bottom-2 duration-300'
              )}
            >
              <ClaudeAvatar />
              <div className="flex-1 pt-1">
                <StreamingIndicator />
              </div>
            </div>
          )}

          <div ref={bottomRef} className="h-6" />
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-8 z-10',
          'bg-gradient-to-t from-bg-base to-transparent',
          'pointer-events-none'
        )}
      />
    </div>
  );
};

// Empty state when no messages
const EmptyState: FC = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div
      className={cn(
        'w-16 h-16 rounded-2xl mb-6',
        'bg-gradient-to-br from-[hsl(25,90%,52%)] to-[hsl(20,80%,40%)]',
        'flex items-center justify-center',
        'shadow-[0_4px_20px_-4px_rgba(234,88,12,0.4)]',
        'ring-1 ring-white/10'
      )}
    >
      <ClaudeIcon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-text-primary mb-2">
      Start a conversation
    </h3>
    <p className="text-sm text-text-muted max-w-sm">
      Describe what you want to build and Claude will help you create it.
    </p>
  </div>
);

// Claude avatar component
const ClaudeAvatar: FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      'relative flex-shrink-0',
      'w-8 h-8 rounded-xl',
      'bg-gradient-to-br from-[hsl(25,90%,52%)] to-[hsl(20,80%,40%)]',
      'flex items-center justify-center',
      'shadow-[0_2px_8px_-2px_rgba(234,88,12,0.4),inset_0_1px_0_0_rgba(255,255,255,0.15)]',
      'ring-1 ring-white/10',
      className
    )}
  >
    <ClaudeIcon className="w-4 h-4 text-white" />
  </div>
);

// Claude icon
const ClaudeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default MessageList;
