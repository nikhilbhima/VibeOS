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

/**
 * Premium MessageItem Component
 *
 * Design Philosophy: Distinct message types with polish
 * - User messages: Right-aligned with accent gradient
 * - Assistant messages: Left-aligned with avatar
 * - Premium badges for thinking time and tools
 * - Glass-morphism code blocks
 * - Smooth hover actions
 */
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
        isLatest && 'animate-in fade-in slide-in-from-bottom-2 duration-300',
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

// User message - right aligned, premium accent styling
const UserMessage: FC<{ content: string }> = ({ content }) => (
  <div className="flex justify-end">
    <div
      className={cn(
        'relative max-w-[85%]',
        'px-4 py-3 rounded-2xl rounded-br-md',
        'bg-gradient-to-br from-accent/20 to-accent/10',
        'ring-1 ring-inset ring-accent/25',
        'text-text-primary text-[15px] leading-relaxed',
        'shadow-[0_2px_8px_-2px_rgba(234,88,12,0.15)]'
      )}
    >
      {/* Subtle inner glow */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl rounded-br-md',
          'bg-gradient-to-br from-white/[0.08] to-transparent',
          'pointer-events-none'
        )}
      />
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

    <div className="flex-1 min-w-0 space-y-2.5">
      {/* Metadata badges */}
      {(thinkingTime || (toolsUsed && toolsUsed.length > 0)) && showAvatar && (
        <div className="flex items-center gap-2 mb-3">
          {thinkingTime && <ThinkingBadge seconds={thinkingTime} />}
          {toolsUsed && toolsUsed.length > 0 && <ToolsBadge tools={toolsUsed} />}
        </div>
      )}

      {/* Message content */}
      <div className="text-[15px] leading-relaxed text-text-primary">
        <MarkdownContent content={content} />
      </div>

      {/* File references */}
      {fileReferences.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-white/[0.04]">
          {fileReferences.map((file) => (
            <FileChip key={file} filename={file} />
          ))}
        </div>
      )}
    </div>
  </div>
);

// System message - centered, subtle styling
const SystemMessage: FC<{ content: string }> = ({ content }) => (
  <div className="flex justify-center py-3">
    <div
      className={cn(
        'px-4 py-2 rounded-full',
        'bg-white/[0.03]',
        'ring-1 ring-inset ring-white/[0.06]',
        'text-xs text-text-muted'
      )}
    >
      {content}
    </div>
  </div>
);

// Claude avatar - premium gradient with glow
const ClaudeAvatar: FC = () => (
  <div
    className={cn(
      'relative flex-shrink-0',
      'w-8 h-8 rounded-xl',
      'bg-gradient-to-br from-[hsl(25,90%,52%)] to-[hsl(20,80%,40%)]',
      'flex items-center justify-center',
      'shadow-[0_2px_8px_-2px_rgba(234,88,12,0.4),inset_0_1px_0_0_rgba(255,255,255,0.15)]',
      'ring-1 ring-white/10'
    )}
  >
    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  </div>
);

// Thinking time badge - premium glass styling
const ThinkingBadge: FC<{ seconds: number }> = ({ seconds }) => (
  <div
    className={cn(
      'inline-flex items-center gap-1.5',
      'px-2.5 py-1 rounded-lg',
      'bg-purple-500/10',
      'ring-1 ring-inset ring-purple-500/20',
      'text-xs text-purple-400'
    )}
  >
    <ClockIcon className="w-3 h-3" />
    <span>Thought for {seconds}s</span>
  </div>
);

// Tools used badge - premium accent styling
const ToolsBadge: FC<{ tools: string[] }> = ({ tools }) => (
  <div
    className={cn(
      'inline-flex items-center gap-1.5',
      'px-2.5 py-1 rounded-lg',
      'bg-accent/10',
      'ring-1 ring-inset ring-accent/20',
      'text-xs text-accent'
    )}
  >
    <ToolIcon className="w-3 h-3" />
    <span>{tools.length} tools used</span>
  </div>
);

// Clock icon
const ClockIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Tool icon
const ToolIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Simple markdown renderer with premium styling
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
          parts.push(
            <CodeBlock
              key={`code-${lineIndex}`}
              code={codeBlockContent.join('\n')}
              language={codeBlockLang}
            />
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        parts.push(
          <h3
            key={lineIndex}
            className="text-base font-semibold text-text-primary mt-5 mb-2 tracking-[-0.01em]"
          >
            {line.slice(4)}
          </h3>
        );
        return;
      }

      if (line.startsWith('## ')) {
        parts.push(
          <h2
            key={lineIndex}
            className="text-lg font-semibold text-text-primary mt-5 mb-2 tracking-[-0.01em]"
          >
            {line.slice(3)}
          </h2>
        );
        return;
      }

      if (line.startsWith('- ')) {
        parts.push(
          <div key={lineIndex} className="flex items-start gap-2.5 my-1.5">
            <span className="text-accent mt-2 flex-shrink-0">
              <svg className="w-1.5 h-1.5 fill-current" viewBox="0 0 6 6">
                <circle cx="3" cy="3" r="3" />
              </svg>
            </span>
            <span className="text-text-primary">{parseInline(line.slice(2))}</span>
          </div>
        );
        return;
      }

      if (line.trim()) {
        parts.push(
          <p key={lineIndex} className="my-2 text-text-primary">
            {parseInline(line)}
          </p>
        );
      } else if (lineIndex > 0) {
        parts.push(<div key={lineIndex} className="h-3" />);
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
        result.push(
          <strong key={keyIndex++} className="font-semibold text-text-primary">
            {boldMatch[1]}
          </strong>
        );
        remaining = remaining.slice(boldIndex + boldMatch[0].length);
      } else if (codeMatch) {
        if (codeIndex > 0) result.push(remaining.slice(0, codeIndex));
        result.push(
          <code
            key={keyIndex++}
            className={cn(
              'px-1.5 py-0.5 rounded',
              'bg-accent/10 text-accent',
              'text-[13px] font-mono',
              'ring-1 ring-inset ring-accent/20'
            )}
          >
            {codeMatch[1]}
          </code>
        );
        remaining = remaining.slice(codeIndex + codeMatch[0].length);
      }
    }

    return result;
  };

  return <div className="space-y-0">{parseMarkdown(content)}</div>;
};

// Premium code block component with glass-morphism
const CodeBlock: FC<{ code: string; language: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'group my-4 rounded-xl overflow-hidden',
        'bg-bg-surface/80 backdrop-blur-sm',
        'ring-1 ring-inset ring-white/[0.06]',
        'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.2)]'
      )}
    >
      {/* Header with language and copy button */}
      <div
        className={cn(
          'flex items-center justify-between px-4 py-2',
          'bg-white/[0.02]',
          'border-b border-white/[0.04]'
        )}
      >
        <span className="text-xs text-text-muted font-mono">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 rounded-md',
            'text-xs text-text-muted',
            'hover:text-text-primary hover:bg-white/[0.04]',
            'transition-all duration-150'
          )}
        >
          {copied ? (
            <>
              <CheckIcon className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <CopyIcon className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="p-4 overflow-x-auto">
        <code className="text-[13px] font-mono leading-relaxed text-text-secondary">
          {code}
        </code>
      </pre>
    </div>
  );
};

// Copy icon
const CopyIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

// Check icon
const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// Message actions - premium floating toolbar
const MessageActions: FC<{
  isVisible: boolean;
  isUser: boolean;
  onCopy: () => void;
}> = ({ isVisible, isUser, onCopy }) => (
  <div
    className={cn(
      'absolute top-2 flex items-center gap-0.5',
      'p-1 rounded-lg',
      'bg-bg-elevated/90 backdrop-blur-sm',
      'ring-1 ring-inset ring-white/[0.08]',
      'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3)]',
      'transition-all duration-150',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none',
      isUser ? 'left-0' : 'right-0'
    )}
  >
    <ActionButton icon={<CopyIcon className="w-3.5 h-3.5" />} onClick={onCopy} tooltip="Copy" />
    <ActionButton icon={<RefreshIcon className="w-3.5 h-3.5" />} onClick={() => {}} tooltip="Regenerate" />
    <ActionButton icon={<EditIcon className="w-3.5 h-3.5" />} onClick={() => {}} tooltip="Edit" />
  </div>
);

// Action button for message toolbar
const ActionButton: FC<{
  icon: JSX.Element;
  onClick: () => void;
  tooltip: string;
}> = ({ icon, onClick, tooltip }) => (
  <button
    onClick={onClick}
    title={tooltip}
    className={cn(
      'p-1.5 rounded-md',
      'text-text-muted hover:text-text-primary',
      'hover:bg-white/[0.06]',
      'transition-colors duration-150'
    )}
  >
    {icon}
  </button>
);

// Refresh icon
const RefreshIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

// Edit icon
const EditIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
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
