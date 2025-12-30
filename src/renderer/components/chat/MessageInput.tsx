import { type FC, useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface MessageInputProps {
  onSend: (content: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
}

/**
 * Premium MessageInput Component
 *
 * Design Philosophy: Elevated composition area
 * - Glass-morphism container with glow on focus
 * - Premium send button with gradient
 * - Refined action bar with subtle interactions
 * - Animated mode toggle with indicator
 */
export const MessageInput: FC<MessageInputProps> = ({
  onSend,
  isDisabled = false,
  placeholder = 'Message Claude...',
  className,
}) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    <div
      className={cn(
        'p-4',
        'bg-gradient-to-t from-bg-surface/80 to-bg-surface/40',
        'backdrop-blur-sm',
        'border-t border-white/[0.04]',
        className
      )}
    >
      {/* Input container */}
      <div className="relative">
        {/* Outer glow on focus */}
        <div
          className={cn(
            'absolute -inset-px rounded-[14px] transition-opacity duration-300',
            'bg-gradient-to-b from-accent/25 via-accent/10 to-accent/5',
            isFocused ? 'opacity-100' : 'opacity-0'
          )}
        />

        <div
          className={cn(
            'relative rounded-xl overflow-hidden',
            'bg-bg-surface/90 backdrop-blur-xl',
            'ring-1 ring-inset',
            isFocused
              ? 'ring-accent/40'
              : 'ring-white/[0.08] hover:ring-white/[0.12]',
            'shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.04)]',
            'transition-all duration-200'
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
                'flex-1 bg-transparent',
                'text-[15px] text-text-primary leading-relaxed',
                'placeholder:text-text-muted/60',
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
                'flex-shrink-0 p-2.5 rounded-lg',
                'transition-all duration-150',
                value.trim() && !isDisabled
                  ? cn(
                      'bg-gradient-to-b from-[hsl(25,90%,52%)] to-[hsl(25,85%,45%)]',
                      'text-white',
                      'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_1px_2px_0_rgba(0,0,0,0.15),0_2px_8px_-2px_rgba(234,88,12,0.35)]',
                      'hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_12px_-2px_rgba(234,88,12,0.45)]',
                      'hover:translate-y-[-1px] active:translate-y-[0.5px]'
                    )
                  : cn(
                      'bg-white/[0.04] text-text-muted',
                      'cursor-not-allowed'
                    )
              )}
            >
              <SendIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Action bar */}
          <div
            className={cn(
              'flex items-center justify-between px-3 pb-2.5',
              'border-t border-white/[0.04]',
              'bg-white/[0.02]'
            )}
          >
            <div className="flex items-center gap-0.5">
              <ActionButton icon={<AttachIcon />} label="Attach" />
              <ActionButton icon={<PlusIcon />} label="Context" />
              <ActionButton icon={<SparkleIcon />} label="Prompts" />
            </div>

            {/* Keyboard hints */}
            <div className="flex items-center gap-3 text-[11px] text-text-muted">
              <span className="flex items-center gap-1">
                <kbd
                  className={cn(
                    'px-1.5 py-0.5 rounded',
                    'bg-white/[0.04] text-text-muted',
                    'ring-1 ring-inset ring-white/[0.06]',
                    'font-mono text-[10px]'
                  )}
                >
                  Enter
                </kbd>
                <span>send</span>
              </span>
              <span className="text-white/[0.1]">|</span>
              <span className="flex items-center gap-1">
                <kbd
                  className={cn(
                    'px-1.5 py-0.5 rounded',
                    'bg-white/[0.04] text-text-muted',
                    'ring-1 ring-inset ring-white/[0.06]',
                    'font-mono text-[10px]'
                  )}
                >
                  Shift+Enter
                </kbd>
                <span>new line</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex items-center justify-center mt-3">
        <ModeToggle />
      </div>
    </div>
  );
};

// Action button
const ActionButton: FC<{
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg',
      'text-xs font-medium text-text-muted',
      'hover:text-text-secondary hover:bg-white/[0.04]',
      'transition-all duration-150'
    )}
  >
    <span className="w-3.5 h-3.5">{icon}</span>
    <span>{label}</span>
  </button>
);

// Mode toggle with animated indicator
const ModeToggle: FC = () => {
  const [mode, setMode] = useState<'plan' | 'build'>('build');

  return (
    <div
      className={cn(
        'relative flex items-center gap-0.5 p-1',
        'bg-white/[0.03] rounded-lg',
        'ring-1 ring-inset ring-white/[0.06]'
      )}
    >
      {/* Animated background pill */}
      <div
        className={cn(
          'absolute top-1 h-[calc(100%-8px)] rounded-md',
          'bg-white/[0.08]',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]',
          'transition-all duration-200 ease-out'
        )}
        style={{
          width: 'calc(50% - 2px)',
          left: mode === 'plan' ? '4px' : 'calc(50% + 2px)',
        }}
      />

      <button
        onClick={() => setMode('plan')}
        className={cn(
          'relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md',
          'text-xs font-medium',
          'transition-colors duration-150',
          mode === 'plan' ? 'text-text-primary' : 'text-text-muted'
        )}
      >
        <PlanIcon className="h-3.5 w-3.5" />
        <span>Plan</span>
      </button>

      <button
        onClick={() => setMode('build')}
        className={cn(
          'relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md',
          'text-xs font-medium',
          'transition-colors duration-150',
          mode === 'build' ? 'text-text-primary' : 'text-text-muted'
        )}
      >
        <BuildIcon className="h-3.5 w-3.5" />
        <span>Build</span>
      </button>
    </div>
  );
};

// Icons
const SendIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);

const AttachIcon: FC = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
      clipRule="evenodd"
    />
  </svg>
);

const PlusIcon: FC = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);

const SparkleIcon: FC = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
      clipRule="evenodd"
    />
  </svg>
);

const PlanIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
  </svg>
);

const BuildIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
      clipRule="evenodd"
    />
  </svg>
);

export default MessageInput;
