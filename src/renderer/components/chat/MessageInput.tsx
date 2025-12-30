import { type FC, useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface MessageInputProps {
  onSend: (content: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const MessageInput: FC<MessageInputProps> = ({
  onSend,
  isDisabled = false,
  placeholder = 'Message Claude...',
  className,
}) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleSubmit = () => {
    if (value.trim() && !isDisabled) {
      onSend(value.trim());
      setValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={cn('p-4 bg-bg-surface/50', className)}>
      <div
        className={cn(
          'relative rounded-xl border transition-all duration-200',
          isFocused
            ? 'border-accent/50 shadow-lg shadow-accent/5 bg-bg-surface'
            : 'border-border-default bg-bg-elevated/50 hover:border-border-strong'
        )}
      >
        {/* Main input area */}
        <div className="flex items-end gap-2 p-3">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isDisabled}
            rows={1}
            className={cn(
              'flex-1 bg-transparent text-[15px] text-text-primary',
              'placeholder:text-text-muted',
              'resize-none outline-none',
              'min-h-[24px] max-h-[200px]',
              isDisabled && 'opacity-50 cursor-not-allowed'
            )}
          />

          {/* Send button */}
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || isDisabled}
            className={cn(
              'flex-shrink-0 p-2 rounded-lg transition-all duration-150',
              value.trim() && !isDisabled
                ? 'bg-accent text-white hover:bg-accent-hover shadow-md shadow-accent/20'
                : 'bg-bg-elevated text-text-muted cursor-not-allowed'
            )}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19V5m0 0l-7 7m7-7l7 7"
              />
            </svg>
          </button>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between px-3 pb-2">
          <div className="flex items-center gap-1">
            {/* Attach file */}
            <ActionButton icon={<AttachIcon />} label="Attach" />

            {/* Add context */}
            <ActionButton icon={<PlusIcon />} label="Add context" />

            {/* Quick prompts */}
            <ActionButton icon={<SparkleIcon />} label="Prompts" />
          </div>

          {/* Keyboard hint */}
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span>
              <kbd className="px-1 py-0.5 bg-bg-elevated rounded text-[10px]">
                Enter
              </kbd>{' '}
              to send
            </span>
            <span className="text-border-default">|</span>
            <span>
              <kbd className="px-1 py-0.5 bg-bg-elevated rounded text-[10px]">
                Shift + Enter
              </kbd>{' '}
              for new line
            </span>
          </div>
        </div>
      </div>

      {/* Mode indicator */}
      <div className="flex items-center justify-center mt-2">
        <ModeToggle />
      </div>
    </div>
  );
};

// Action button component
const ActionButton: FC<{
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center gap-1.5 px-2 py-1 rounded-md',
      'text-xs text-text-muted hover:text-text-secondary',
      'hover:bg-bg-hover transition-colors'
    )}
  >
    <span className="w-4 h-4">{icon}</span>
    <span>{label}</span>
  </button>
);

// Mode toggle (Plan/Build)
const ModeToggle: FC = () => {
  const [mode, setMode] = useState<'plan' | 'build'>('build');

  return (
    <div className="flex items-center gap-1 p-0.5 bg-bg-elevated rounded-lg">
      <button
        onClick={() => setMode('plan')}
        className={cn(
          'px-3 py-1 text-xs font-medium rounded-md transition-all duration-150',
          mode === 'plan'
            ? 'bg-bg-surface text-text-primary shadow-sm'
            : 'text-text-muted hover:text-text-secondary'
        )}
      >
        Plan
      </button>
      <button
        onClick={() => setMode('build')}
        className={cn(
          'px-3 py-1 text-xs font-medium rounded-md transition-all duration-150',
          mode === 'build'
            ? 'bg-bg-surface text-text-primary shadow-sm'
            : 'text-text-muted hover:text-text-secondary'
        )}
      >
        Build
      </button>
    </div>
  );
};

// Icons
const AttachIcon: FC = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    />
  </svg>
);

const PlusIcon: FC = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const SparkleIcon: FC = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

export default MessageInput;
