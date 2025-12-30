import { type FC, useState } from 'react';
import { cn } from '../../lib/utils';
import { type MockMessage } from '../../lib/mock-data';
import FileChip from './FileChip';

interface MessageItemProps {
  message: MockMessage & {
    thinkingTime?: number;
    toolsUsed?: string[];
    filesReferenced?: string[];
  };
  isLatest?: boolean;
  showAvatar?: boolean;
  className?: string;
}

export const MessageItem: FC<MessageItemProps> = ({
  message,
  isLatest = false,
  showAvatar = true,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  // Extract file references from content
  const fileReferences = extractFileReferences(message.content);

  return (
    <div
      className={cn(
        'group relative py-3',
        'transition-all duration-200',
        isLatest && 'animate-slide-up',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isUser ? (
        <UserMessage content={message.content} />
      ) : isAssistant ? (
        <AssistantMessage
          content={message.content}
          thinkingTime={message.thinkingTime}
          toolsUsed={message.toolsUsed}
          fileReferences={fileReferences}
          showAvatar={showAvatar}
        />
      ) : (
        <SystemMessage content={message.content} />
      )}

      {/* Message actions */}
      <MessageActions
        isVisible={isHovered}
        isUser={isUser}
        onCopy={() => navigator.clipboard.writeText(message.content)}
      />
    </div>
  );
};

// User message - right aligned, accent tinted
const UserMessage: FC<{ content: string }> = ({ content }) => (
  <div className="flex justify-end">
    <div
      className={cn(
        'relative max-w-[85%]',
        'px-4 py-3 rounded-2xl rounded-br-md',
        'bg-accent/15 border border-accent/20',
        'text-text-primary text-[15px] leading-relaxed'
      )}
    >
      <div className="absolute inset-0 rounded-2xl rounded-br-md bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
      <span className="relative">{content}</span>
    </div>
  </div>
);

// Assistant message - left aligned with avatar
const AssistantMessage: FC<{
  content: string;
  thinkingTime?: number;
  toolsUsed?: string[];
  fileReferences: string[];
  showAvatar: boolean;
}> = ({ content, thinkingTime, toolsUsed, fileReferences, showAvatar }) => (
  <div className="flex items-start gap-3">
    {showAvatar ? <ClaudeAvatar /> : <div className="w-8 flex-shrink-0" />}

    <div className="flex-1 min-w-0 space-y-2">
      {thinkingTime && showAvatar && (
        <div className="flex items-center gap-2 mb-2">
          <ThinkingBadge seconds={thinkingTime} />
          {toolsUsed && toolsUsed.length > 0 && <ToolsBadge tools={toolsUsed} />}
        </div>
      )}

      <div className="text-[15px] leading-relaxed text-text-primary">
        <MarkdownContent content={content} />
      </div>

      {fileReferences.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {fileReferences.map((file) => (
            <FileChip key={file} filename={file} />
          ))}
        </div>
      )}
    </div>
  </div>
);

// System message
const SystemMessage: FC<{ content: string }> = ({ content }) => (
  <div className="flex justify-center py-2">
    <div className="px-3 py-1.5 rounded-full bg-bg-elevated/50 text-xs text-text-muted">
      {content}
    </div>
  </div>
);

// Claude avatar
const ClaudeAvatar: FC = () => (
  <div
    className={cn(
      'relative flex-shrink-0',
      'w-8 h-8 rounded-xl',
      'bg-gradient-to-br from-accent via-orange-500 to-amber-600',
      'flex items-center justify-center',
      'shadow-lg shadow-accent/20',
      'ring-1 ring-white/10'
    )}
  >
    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L4 9v12h16V9l-8-6z" />
      <path d="M9 21v-6h6v6" />
    </svg>
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
  </div>
);

// Thinking time badge
const ThinkingBadge: FC<{ seconds: number }> = ({ seconds }) => (
  <div className={cn('inline-flex items-center gap-1.5', 'px-2.5 py-1 rounded-full', 'bg-bg-elevated border border-border-subtle', 'text-xs text-text-secondary')}>
    <svg className="w-3 h-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Thought for {seconds}s</span>
  </div>
);

// Tools used badge
const ToolsBadge: FC<{ tools: string[] }> = ({ tools }) => (
  <div className={cn('inline-flex items-center gap-1.5', 'px-2.5 py-1 rounded-full', 'bg-accent/10 border border-accent/20', 'text-xs text-accent')}>
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    <span>{tools.length} tools used</span>
  </div>
);

// Simple markdown renderer
const MarkdownContent: FC<{ content: string }> = ({ content }) => {
  const parseMarkdown = (text: string): JSX.Element[] => {
    const parts: JSX.Element[] = [];
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = '';

    lines.forEach((line, lineIndex) => {
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLang = line.slice(3).trim();
          codeBlockContent = [];
        } else {
          inCodeBlock = false;
          parts.push(<CodeBlock key={`code-${lineIndex}`} code={codeBlockContent.join('\n')} language={codeBlockLang} />);
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        parts.push(<h3 key={lineIndex} className="text-base font-semibold text-text-primary mt-4 mb-2">{line.slice(4)}</h3>);
        return;
      }

      if (line.startsWith('## ')) {
        parts.push(<h2 key={lineIndex} className="text-lg font-semibold text-text-primary mt-4 mb-2">{line.slice(3)}</h2>);
        return;
      }

      if (line.startsWith('- ')) {
        parts.push(
          <div key={lineIndex} className="flex items-start gap-2 my-1">
            <span className="text-accent mt-1.5"><svg className="w-1.5 h-1.5 fill-current" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" /></svg></span>
            <span>{parseInline(line.slice(2))}</span>
          </div>
        );
        return;
      }

      if (line.trim()) {
        parts.push(<p key={lineIndex} className="my-2">{parseInline(line)}</p>);
      } else if (lineIndex > 0) {
        parts.push(<div key={lineIndex} className="h-2" />);
      }
    });

    return parts;
  };

  const parseInline = (text: string): (string | JSX.Element)[] => {
    const result: (string | JSX.Element)[] = [];
    let remaining = text;
    let keyIndex = 0;

    // Handle bold and code
    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      const codeMatch = remaining.match(/`([^`]+)`/);

      if (!boldMatch && !codeMatch) {
        result.push(remaining);
        break;
      }

      const boldIndex = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;
      const codeIndex = codeMatch ? remaining.indexOf(codeMatch[0]) : Infinity;

      if (boldIndex < codeIndex && boldMatch) {
        if (boldIndex > 0) result.push(remaining.slice(0, boldIndex));
        result.push(<strong key={keyIndex++} className="font-semibold text-text-primary">{boldMatch[1]}</strong>);
        remaining = remaining.slice(boldIndex + boldMatch[0].length);
      } else if (codeMatch) {
        if (codeIndex > 0) result.push(remaining.slice(0, codeIndex));
        result.push(<code key={keyIndex++} className="px-1.5 py-0.5 rounded bg-bg-elevated text-accent text-[13px] font-mono">{codeMatch[1]}</code>);
        remaining = remaining.slice(codeIndex + codeMatch[0].length);
      }
    }

    return result;
  };

  return <div className="space-y-0">{parseMarkdown(content)}</div>;
};

// Code block component
const CodeBlock: FC<{ code: string; language: string }> = ({ code, language }) => (
  <div className="my-3 rounded-lg overflow-hidden border border-border-subtle">
    {language && <div className="px-3 py-1.5 bg-bg-elevated border-b border-border-subtle text-xs text-text-muted">{language}</div>}
    <pre className="p-3 bg-bg-surface overflow-x-auto">
      <code className="text-[13px] font-mono text-text-secondary">{code}</code>
    </pre>
  </div>
);

// Message actions
const MessageActions: FC<{ isVisible: boolean; isUser: boolean; onCopy: () => void }> = ({ isVisible, isUser, onCopy }) => (
  <div className={cn('absolute top-2 flex items-center gap-1', 'transition-opacity duration-150', isVisible ? 'opacity-100' : 'opacity-0', isUser ? 'left-0' : 'right-0')}>
    <button onClick={onCopy} className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors" title="Copy message">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </button>
  </div>
);

// Helper to extract file references
function extractFileReferences(content: string): string[] {
  const filePattern = /`([^`]+\.(tsx?|jsx?|css|json|md|html|vue|svelte))`/g;
  const matches: string[] = [];
  let match;
  while ((match = filePattern.exec(content)) !== null) {
    if (!matches.includes(match[1])) matches.push(match[1]);
  }
  return matches;
}

export default MessageItem;
