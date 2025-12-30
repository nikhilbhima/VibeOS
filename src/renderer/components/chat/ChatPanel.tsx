import { type FC, useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { mockMessages, mockActivities } from '../../lib/mock-data';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ActivityFeed from './ActivityFeed';

interface ChatPanelProps {
  className?: string;
  projectName?: string;
}

/**
 * Premium ChatPanel Component
 *
 * Design Philosophy: Professional conversation interface
 * - Glass-morphism header with status indicator
 * - Seamless message flow with subtle animations
 * - Collapsible activity feed sidebar
 * - Premium input area with focus effects
 */
export const ChatPanel: FC<ChatPanelProps> = ({ className, projectName }) => {
  const [messages, setMessages] = useState(mockMessages);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsStreaming(true);
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content:
          "I'll help you with that. Let me analyze your request and start building...",
        timestamp: new Date(),
        thinkingTime: 12,
        toolsUsed: ['Read', 'Write', 'Edit'],
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsStreaming(false);
    }, 2000);
  };

  return (
    <div className={cn('flex flex-col h-full bg-bg-base', className)}>
      {/* Chat header */}
      <div
        className={cn(
          'flex items-center justify-between px-4 py-3',
          'bg-bg-surface/60 backdrop-blur-md',
          'border-b border-white/[0.04]',
          'shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.1)]'
        )}
      >
        <div className="flex items-center gap-3">
          {/* Claude avatar */}
          <div
            className={cn(
              'relative h-9 w-9 rounded-xl',
              'bg-gradient-to-br from-[hsl(25,90%,52%)] to-[hsl(20,80%,40%)]',
              'flex items-center justify-center',
              'shadow-[0_2px_8px_-2px_rgba(234,88,12,0.4),inset_0_1px_0_0_rgba(255,255,255,0.15)]',
              'ring-1 ring-white/10'
            )}
          >
            <ClaudeIcon className="h-5 w-5 text-white" />
            {/* Status indicator */}
            <span
              className={cn(
                'absolute -bottom-0.5 -right-0.5',
                'h-3 w-3 rounded-full',
                'border-2 border-bg-surface',
                isStreaming
                  ? 'bg-amber-500 animate-pulse'
                  : 'bg-emerald-500 shadow-[0_0_6px_1px_rgba(16,185,129,0.4)]'
              )}
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-text-primary tracking-[-0.01em]">
              Claude
            </h2>
            <p className="text-xs text-text-muted">
              {isStreaming ? (
                <span className="flex items-center gap-1.5">
                  <span className="inline-flex gap-0.5">
                    <span
                      className="h-1 w-1 rounded-full bg-accent animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="h-1 w-1 rounded-full bg-accent animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="h-1 w-1 rounded-full bg-accent animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </span>
                  Thinking...
                </span>
              ) : (
                'Ready to help'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Toggle to show what Claude is doing */}
          <button
            onClick={() => setShowActivity(!showActivity)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
              'text-xs font-medium',
              'transition-all duration-150',
              showActivity
                ? cn(
                    'bg-white/[0.08] text-text-primary',
                    'ring-1 ring-inset ring-white/[0.08]'
                  )
                : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.04]'
            )}
          >
            <ActivityIcon className="h-3.5 w-3.5" />
            <span>Details</span>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Messages column */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Message list */}
          <MessageList
            messages={messages}
            isStreaming={isStreaming}
            className="flex-1"
          />
          <div ref={messagesEndRef} />

          {/* Input area */}
          <MessageInput onSend={handleSendMessage} isDisabled={isStreaming} />
        </div>

        {/* Activity feed (collapsible) */}
        {showActivity && (
          <ActivityFeed
            activities={mockActivities}
            className={cn(
              'w-72 flex-shrink-0',
              'border-l border-white/[0.04]',
              'bg-bg-surface/30 backdrop-blur-sm'
            )}
          />
        )}
      </div>
    </div>
  );
};

// Icons
const ClaudeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ActivityIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
      clipRule="evenodd"
    />
  </svg>
);

export default ChatPanel;
