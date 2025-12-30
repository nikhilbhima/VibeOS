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
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate assistant response
    setIsStreaming(true);
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: "I'll help you with that. Let me analyze your request and start building...",
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
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center">
            <ClaudeIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-text-primary">Claude</h2>
            <p className="text-xs text-text-muted">
              {isStreaming ? 'Thinking...' : 'Ready to help'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Activity toggle */}
          <button
            onClick={() => setShowActivity(!showActivity)}
            className={cn(
              'px-3 py-1.5 text-xs rounded-lg transition-colors',
              showActivity
                ? 'bg-bg-elevated text-text-primary'
                : 'text-text-muted hover:text-text-secondary hover:bg-bg-hover'
            )}
          >
            Activity
          </button>

          {/* More options */}
          <button className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-hover rounded-lg transition-colors">
            <MoreIcon className="h-4 w-4" />
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
          <MessageInput
            onSend={handleSendMessage}
            isDisabled={isStreaming}
            className="border-t border-border-subtle"
          />
        </div>

        {/* Activity feed (collapsible) */}
        {showActivity && (
          <ActivityFeed
            activities={mockActivities}
            className="w-64 border-l border-border-subtle"
          />
        )}
      </div>
    </div>
  );
};

// Icons
const ClaudeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const MoreIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

export default ChatPanel;
