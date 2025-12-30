import { type FC, useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onCommand?: (command: Command) => void;
}

interface Command {
  id: string;
  label: string;
  shortcut?: string[];
  icon?: JSX.Element;
  category?: string;
  action?: () => void;
}

/**
 * Premium CommandPalette Component
 *
 * Design Philosophy: Raycast-style command center
 * - Instant search with fuzzy matching
 * - Keyboard-first navigation
 * - Categorized commands
 * - Recent commands memory
 */
export const CommandPalette: FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onCommand,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // All available commands
  const commands: Command[] = [
    // Actions
    { id: 'new-project', label: 'New Project', shortcut: ['Cmd', 'N'], icon: <PlusIcon />, category: 'Actions' },
    { id: 'open-project', label: 'Open Project', shortcut: ['Cmd', 'O'], icon: <FolderIcon />, category: 'Actions' },
    { id: 'deploy', label: 'Deploy to Vercel', icon: <RocketIcon />, category: 'Actions' },
    { id: 'commit', label: 'Commit Changes', icon: <GitIcon />, category: 'Actions' },

    // View
    { id: 'toggle-sidebar', label: 'Toggle Sidebar', shortcut: ['Cmd', 'B'], icon: <SidebarIcon />, category: 'View' },
    { id: 'toggle-preview', label: 'Toggle Preview', shortcut: ['Cmd', 'P'], icon: <PreviewIcon />, category: 'View' },
    { id: 'toggle-code', label: 'Toggle Code View', shortcut: ['Cmd', 'E'], icon: <CodeIcon />, category: 'View' },
    { id: 'toggle-console', label: 'Toggle Console', icon: <ConsoleIcon />, category: 'View' },

    // Claude
    { id: 'plan-mode', label: 'Switch to Plan Mode', icon: <PlanIcon />, category: 'Claude' },
    { id: 'build-mode', label: 'Switch to Build Mode', icon: <BuildIcon />, category: 'Claude' },
    { id: 'change-model', label: 'Change Model', shortcut: ['Cmd', 'M'], icon: <BrainIcon />, category: 'Claude' },
    { id: 'clear-chat', label: 'Clear Chat History', icon: <TrashIcon />, category: 'Claude' },

    // Settings
    { id: 'settings', label: 'Open Settings', shortcut: ['Cmd', ','], icon: <SettingsIcon />, category: 'Settings' },
    { id: 'shortcuts', label: 'Keyboard Shortcuts', icon: <KeyboardIcon />, category: 'Settings' },
  ];

  // Filter commands based on query
  const filteredCommands = query
    ? commands.filter((cmd) =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  // Group by category
  const groupedCommands = filteredCommands.reduce<Record<string, Command[]>>(
    (acc, cmd) => {
      const category = cmd.category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(cmd);
      return acc;
    },
    {}
  );

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((i) =>
            Math.min(i + 1, filteredCommands.length - 1)
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          const cmd = filteredCommands[selectedIndex];
          if (cmd) {
            onCommand?.(cmd);
            cmd.action?.();
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onCommand, onClose]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-black/50 backdrop-blur-sm',
          'animate-in fade-in duration-150'
        )}
        onClick={onClose}
      />

      {/* Palette */}
      <div
        className={cn(
          'relative w-full max-w-xl mx-4',
          'bg-bg-surface/95 backdrop-blur-xl',
          'rounded-2xl overflow-hidden',
          'ring-1 ring-inset ring-white/[0.1]',
          'shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]',
          'animate-in zoom-in-95 slide-in-from-top-4 fade-in duration-200'
        )}
      >
        {/* Search input */}
        <div
          className={cn(
            'flex items-center gap-3 px-4 py-4',
            'border-b border-white/[0.06]'
          )}
        >
          <SearchIcon className="w-5 h-5 text-text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands..."
            className={cn(
              'flex-1 bg-transparent',
              'text-base text-text-primary',
              'placeholder:text-text-muted/60',
              'outline-none'
            )}
          />
          <kbd
            className={cn(
              'px-2 py-1 rounded',
              'bg-white/[0.04] text-text-muted',
              'ring-1 ring-inset ring-white/[0.06]',
              'text-xs font-mono'
            )}
          >
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {Object.entries(groupedCommands).length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-text-muted">No commands found</p>
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, cmds]) => (
              <div key={category} className="mb-2 last:mb-0">
                <div className="px-3 py-2 text-xs font-medium text-text-muted uppercase tracking-wider">
                  {category}
                </div>
                {cmds.map((cmd) => {
                  flatIndex++;
                  const isSelected = flatIndex === selectedIndex;
                  return (
                    <CommandItem
                      key={cmd.id}
                      command={cmd}
                      isSelected={isSelected}
                      onClick={() => {
                        onCommand?.(cmd);
                        cmd.action?.();
                        onClose();
                      }}
                    />
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className={cn(
            'flex items-center justify-between px-4 py-3',
            'border-t border-white/[0.04]',
            'bg-white/[0.02]'
          )}
        >
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <kbd
                className={cn(
                  'px-1.5 py-0.5 rounded',
                  'bg-white/[0.04]',
                  'ring-1 ring-inset ring-white/[0.06]',
                  'font-mono text-[10px]'
                )}
              >
                <span className="sr-only">Up and Down arrows</span>
                <span aria-hidden="true">
                  <span className="inline-block transform rotate-0">&#x2191;</span>
                  <span className="inline-block transform rotate-0">&#x2193;</span>
                </span>
              </kbd>
              <span>navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd
                className={cn(
                  'px-1.5 py-0.5 rounded',
                  'bg-white/[0.04]',
                  'ring-1 ring-inset ring-white/[0.06]',
                  'font-mono text-[10px]'
                )}
              >
                enter
              </kbd>
              <span>select</span>
            </span>
          </div>
          <span className="text-xs text-text-muted">
            {filteredCommands.length} command{filteredCommands.length !== 1 && 's'}
          </span>
        </div>
      </div>
    </div>
  );
};

// Command item component
const CommandItem: FC<{
  command: Command;
  isSelected: boolean;
  onClick: () => void;
}> = ({ command, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
      'text-left',
      'transition-colors duration-100',
      isSelected
        ? cn(
            'bg-accent/15 text-text-primary',
            'ring-1 ring-inset ring-accent/20'
          )
        : 'text-text-secondary hover:bg-white/[0.04]'
    )}
  >
    {/* Icon */}
    <span
      className={cn(
        'flex-shrink-0 w-8 h-8 rounded-lg',
        'flex items-center justify-center',
        isSelected
          ? 'bg-accent/20 text-accent'
          : 'bg-white/[0.04] text-text-muted'
      )}
    >
      {command.icon || <CommandIcon className="w-4 h-4" />}
    </span>

    {/* Label */}
    <span className="flex-1 text-sm font-medium">{command.label}</span>

    {/* Shortcut */}
    {command.shortcut && (
      <div className="flex items-center gap-1">
        {command.shortcut.map((key, i) => (
          <kbd
            key={i}
            className={cn(
              'px-1.5 py-0.5 rounded',
              'bg-white/[0.04] text-text-muted',
              'ring-1 ring-inset ring-white/[0.06]',
              'text-xs font-mono'
            )}
          >
            {key}
          </kbd>
        ))}
      </div>
    )}
  </button>
);

// Icons
const iconClass = 'w-4 h-4';

const SearchIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PlusIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const FolderIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const RocketIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

const GitIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const SidebarIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);

const PreviewIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CodeIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const ConsoleIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PlanIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const BuildIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const BrainIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const TrashIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const SettingsIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const KeyboardIcon: FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm2 2v2h2V8H5zm4 0v2h2V8H9zm4 0v2h2V8h-2zm4 0v2h2V8h-2zm-8 4v2h2v-2H9zm4 0v2h2v-2h-2zM5 14v2h14v-2H5z" />
  </svg>
);

const CommandIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default CommandPalette;
