import { type FC, useState } from 'react';
import { cn } from '../../lib/utils';
import { Avatar } from '../ui/Avatar';

interface TopBarProps {
  projectName?: string;
  isLoading?: boolean;
  className?: string;
  onOpenCommandPalette?: () => void;
  onOpenSettings?: () => void;
}

type ViewTab = 'preview' | 'code' | 'changes';
type ModelType = 'haiku' | 'sonnet' | 'opus';

/**
 * Premium TopBar Component
 *
 * Design Philosophy: Refined luxury with glass-morphism
 * - macOS-style drag region with subtle styling
 * - Animated pill tab selector
 * - Premium micro-interactions throughout
 */
export const TopBar: FC<TopBarProps> = ({
  projectName,
  isLoading = false,
  className,
  onOpenCommandPalette,
  onOpenSettings,
}) => {
  const [activeTab, setActiveTab] = useState<ViewTab>('preview');
  const [selectedModel, setSelectedModel] = useState<ModelType>('sonnet');
  const [isModelOpen, setIsModelOpen] = useState(false);

  const tabs: { id: ViewTab; label: string }[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
    { id: 'changes', label: 'Changes' },
  ];

  const models: { id: ModelType; label: string; description: string }[] = [
    { id: 'haiku', label: 'Haiku', description: 'Fast & efficient' },
    { id: 'sonnet', label: 'Sonnet', description: 'Balanced' },
    { id: 'opus', label: 'Opus', description: 'Most capable' },
  ];

  return (
    <header
      className={cn(
        'h-12 flex-shrink-0',
        // Glass morphism background
        'bg-bg-surface/60 backdrop-blur-xl',
        // Subtle bottom border
        'border-b border-white/[0.04]',
        // Inner glow at top
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]',
        className
      )}
    >
      {/* Drag region for window movement */}
      <div className="drag-region absolute inset-0" />

      {/* Content */}
      <div className="no-drag relative h-full flex items-center justify-between px-4">
        {/* Left section - Logo & Project */}
        <div className="flex items-center gap-3 min-w-[200px]">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className={cn(
                'h-7 w-7 rounded-lg flex items-center justify-center',
                // Premium gradient
                'bg-gradient-to-br from-[hsl(25,90%,52%)] to-[hsl(20,80%,40%)]',
                // Depth with shadows
                'shadow-[0_2px_8px_-2px_rgba(234,88,12,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2)]',
                // Loading pulse
                isLoading && 'animate-pulse'
              )}
            >
              <svg
                className="h-4 w-4 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
              </svg>
            </div>

            {projectName ? (
              <button
                className={cn(
                  'group flex items-center gap-1.5',
                  'px-2 py-1 -mx-2 rounded-md',
                  'transition-all duration-150',
                  'hover:bg-white/[0.04]'
                )}
              >
                <span className="text-sm font-medium text-text-primary tracking-[-0.01em]">
                  {projectName}
                </span>
                <ChevronIcon className="h-3.5 w-3.5 text-text-muted group-hover:text-text-secondary transition-colors" />
              </button>
            ) : (
              <span className="text-sm font-semibold text-text-primary tracking-[-0.02em]">
                VibeOS
              </span>
            )}
          </div>
        </div>

        {/* Center section - View Tabs */}
        {projectName && (
          <div className="absolute left-1/2 -translate-x-1/2">
            <div
              className={cn(
                'relative flex items-center gap-0.5 p-1',
                // Glass container
                'bg-white/[0.03] rounded-lg',
                'ring-1 ring-inset ring-white/[0.06]'
              )}
            >
              {/* Animated pill background */}
              <div
                className={cn(
                  'absolute top-1 h-[calc(100%-8px)] rounded-md',
                  'bg-white/[0.08]',
                  'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]',
                  'transition-all duration-200 ease-out'
                )}
                style={{
                  width: `${100 / tabs.length}%`,
                  left: `${tabs.findIndex((t) => t.id === activeTab) * (100 / tabs.length)}%`,
                  transform: 'translateX(4px)',
                }}
              />

              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative z-10 px-4 py-1.5',
                    'text-xs font-medium rounded-md',
                    'transition-colors duration-150',
                    activeTab === tab.id
                      ? 'text-text-primary'
                      : 'text-text-muted hover:text-text-secondary'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Right section - Actions */}
        <div className="flex items-center gap-2 min-w-[200px] justify-end">
          {/* Search / Command Palette */}
          <button
            onClick={onOpenCommandPalette}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5',
              'text-xs text-text-muted',
              'bg-white/[0.03] hover:bg-white/[0.06]',
              'rounded-lg',
              'ring-1 ring-inset ring-white/[0.06] hover:ring-white/[0.08]',
              'transition-all duration-150'
            )}
          >
            <SearchIcon className="h-3.5 w-3.5" />
            <span className="text-text-muted">Search</span>
            <kbd
              className={cn(
                'px-1.5 py-0.5 text-[10px]',
                'bg-white/[0.06] rounded',
                'ring-1 ring-inset ring-white/[0.08]',
                'font-mono'
              )}
            >
              ⌘K
            </kbd>
          </button>

          {/* Divider */}
          <div className="h-4 w-px bg-white/[0.06]" />

          {/* Model Selector */}
          <div className="relative">
            <button
              onClick={() => setIsModelOpen(!isModelOpen)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5',
                'text-xs font-medium text-text-secondary',
                'bg-white/[0.03] hover:bg-white/[0.06]',
                'rounded-lg',
                'ring-1 ring-inset ring-white/[0.06] hover:ring-white/[0.08]',
                'transition-all duration-150'
              )}
            >
              {/* Status indicator */}
              <span
                className={cn(
                  'h-2 w-2 rounded-full',
                  'bg-emerald-500',
                  'shadow-[0_0_6px_1px_rgba(16,185,129,0.4)]'
                )}
              />
              <span className="capitalize">{selectedModel}</span>
              <ChevronIcon
                className={cn(
                  'h-3 w-3 text-text-muted transition-transform duration-150',
                  isModelOpen && 'rotate-180'
                )}
              />
            </button>

            {/* Dropdown */}
            {isModelOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsModelOpen(false)}
                />
                <div
                  className={cn(
                    'absolute right-0 top-full mt-1 z-50',
                    'w-48 py-1',
                    'bg-bg-elevated/95 backdrop-blur-xl',
                    'rounded-lg',
                    'ring-1 ring-white/[0.08]',
                    'shadow-[0_8px_30px_-4px_rgba(0,0,0,0.4)]',
                    'animate-scale-in origin-top-right'
                  )}
                >
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model.id);
                        setIsModelOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2',
                        'text-left transition-colors duration-150',
                        selectedModel === model.id
                          ? 'bg-white/[0.06]'
                          : 'hover:bg-white/[0.04]'
                      )}
                    >
                      <span
                        className={cn(
                          'h-2 w-2 rounded-full',
                          selectedModel === model.id
                            ? 'bg-emerald-500 shadow-[0_0_6px_1px_rgba(16,185,129,0.4)]'
                            : 'bg-text-muted/50'
                        )}
                      />
                      <div>
                        <div className="text-sm font-medium text-text-primary">
                          {model.label}
                        </div>
                        <div className="text-xs text-text-muted">
                          {model.description}
                        </div>
                      </div>
                      {selectedModel === model.id && (
                        <CheckIcon className="h-4 w-4 text-emerald-500 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className={cn(
              'p-2 rounded-lg',
              'text-text-muted hover:text-text-primary',
              'hover:bg-white/[0.04]',
              'transition-all duration-150'
            )}
            title="Settings (Cmd+,)"
          >
            <SettingsIcon className="h-4 w-4" />
          </button>

          {/* User Avatar */}
          <Avatar
            size="sm"
            name="User"
            status="online"
            className="cursor-pointer hover:ring-accent/30 transition-all"
          />
        </div>
      </div>
    </header>
  );
};

// Icons
const ChevronIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
  </svg>
);

const SearchIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.5 11.5L14 14M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
    />
  </svg>
);

const SettingsIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.5 1.5h3M8 1.5v2M14 6.5v3M14 8h-2M9.5 14.5h-3M8 14.5v-2M2 9.5v-3M2 8h2"
    />
    <circle cx="8" cy="8" r="2.5" />
  </svg>
);

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z"
      clipRule="evenodd"
    />
  </svg>
);

export default TopBar;
