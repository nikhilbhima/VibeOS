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
    <div
      ref={scrollRef}
      className={cn(
        'flex-1 overflow-y-auto overflow-x-hidden',
        'scroll-smooth',
        className
      )}
    >
      {/* Messages container with max-width for readability */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-1">
        {messages.map((message, index) => (
          <MessageItem
            key={message.id}
            message={message}
            isLatest={index === messages.length - 1}
            showAvatar={
              index === 0 ||
              messages[index - 1].role !== message.role
            }
          />
        ))}

        {/* Streaming indicator */}
        {isStreaming && (
          <div className="flex items-start gap-3 py-4 animate-fade-in">
            <ClaudeAvatar />
            <div className="flex-1 pt-1">
              <StreamingIndicator />
            </div>
          </div>
        )}

        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};

// Claude avatar component
const ClaudeAvatar: FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      'relative flex-shrink-0',
      'w-8 h-8 rounded-xl',
      'bg-gradient-to-br from-accent via-orange-500 to-amber-600',
      'flex items-center justify-center',
      'shadow-lg shadow-accent/20',
      'ring-1 ring-white/10',
      className
    )}
  >
    <svg
      className="w-4 h-4 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3L4 9v12h16V9l-8-6z" />
      <path d="M9 21v-6h6v6" />
    </svg>
    {/* Subtle glow effect */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
  </div>
);

export default MessageList;
