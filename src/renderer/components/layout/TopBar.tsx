import { type FC, useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Avatar } from '../ui/Avatar';

interface TopBarProps {
  projectName?: string;
  isLoading?: boolean;
  className?: string;
  onOpenCommandPalette?: () => void;
  onOpenSettings?: () => void;
}

// Mock usage data - in real app, this comes from Claude Code API
const usageData = {
  session: {
    label: '5-Hour Usage',
    percentage: 8,
    status: 'good' as const,
    resetsIn: '2h 53m',
  },
  weekly: {
    label: '7-Day Usage',
    percentage: 77,
    status: 'critical' as const,
    resetsIn: '2d 11h',
  },
  model: {
    label: 'Sonnet (7-Day)',
    percentage: 1,
    status: 'good' as const,
    resetsIn: '4d 11h',
  },
};

/**
 * Premium TopBar Component
 *
 * Design Philosophy: Clean, simple navigation
 * - macOS-style drag region with subtle styling
 * - Minimal controls - just what vibe coders need
 */
export const TopBar: FC<TopBarProps> = ({
  projectName,
  isLoading = false,
  className,
  onOpenCommandPalette,
  onOpenSettings,
}) => {
  const [showUsagePanel, setShowUsagePanel] = useState(false);
  const usagePanelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (usagePanelRef.current && !usagePanelRef.current.contains(event.target as Node)) {
        setShowUsagePanel(false);
      }
    };
    if (showUsagePanel) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUsagePanel]);

  // Primary usage indicator (weekly is most important)
  const primaryUsage = usageData.weekly;

  return (
    <header
      className={cn(
        'h-12 flex-shrink-0 overflow-visible',
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
        <div className="flex items-center gap-3 min-w-[280px]">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className={cn(
                'h-7 w-7 rounded-[8px] flex items-center justify-center',
                'bg-[#171717]',
                'ring-1 ring-white/[0.08]',
                isLoading && 'animate-pulse'
              )}
            >
              {/* VibeOS logomark - abstract V, single stroke */}
              <svg
                className="h-[14px] w-[14px]"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 4L8 12L13 4"
                  stroke="url(#vibe-gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="vibe-gradient" x1="3" y1="4" x2="13" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F472B6" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
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

        {/* Right section - Actions */}
        <div className="flex items-center gap-2 min-w-[320px] justify-end">
          {/* Usage Circle Indicator */}
          <div className="relative no-drag" ref={usagePanelRef}>
            <button
              onClick={() => setShowUsagePanel(!showUsagePanel)}
              className={cn(
                'relative p-1.5 rounded-lg',
                'hover:bg-white/[0.04]',
                'transition-all duration-150',
                showUsagePanel && 'bg-white/[0.04]'
              )}
              title="Usage stats"
            >
              <UsageCircle percentage={primaryUsage.percentage} status={primaryUsage.status} />
            </button>

            {/* Usage Panel Popover */}
            {showUsagePanel && (
              <div
                className={cn(
                  'absolute right-0 top-full mt-2 z-50',
                  'w-72 p-4 rounded-xl',
                  'bg-bg-elevated backdrop-blur-xl',
                  'border border-white/[0.08]',
                  'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)]',
                  'animate-in'
                )}
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center">
                    <StatsIcon className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Usage Stats</span>
                </div>

                {/* Current Session */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <ClockIcon className="h-3 w-3 text-text-muted" />
                    <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">
                      Current Session
                    </span>
                  </div>
                  <UsageRow {...usageData.session} />
                </div>

                {/* Weekly Limits */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <CalendarIcon className="h-3 w-3 text-text-muted" />
                    <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">
                      Weekly Limits
                    </span>
                  </div>
                  <div className="space-y-3">
                    <UsageRow {...usageData.weekly} />
                    <UsageRow {...usageData.model} />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                  <button
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
                      'text-xs font-medium text-text-muted',
                      'ring-1 ring-inset ring-white/[0.08]',
                      'hover:bg-white/[0.04] hover:text-text-secondary',
                      'transition-all duration-150'
                    )}
                  >
                    <RefreshIcon className="h-3 w-3" />
                    <span>just now</span>
                  </button>
                  <button
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
                      'text-xs font-medium text-text-secondary',
                      'bg-white/[0.04] hover:bg-white/[0.06]',
                      'transition-all duration-150'
                    )}
                  >
                    <GridIcon className="h-3 w-3" />
                    <span>Dashboard</span>
                  </button>
                </div>
              </div>
            )}
          </div>

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

const StatsIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 11a1 1 0 011-1h1a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM9 8a1 1 0 011-1h1a1 1 0 011 1v6a1 1 0 01-1 1h-1a1 1 0 01-1-1V8zM14 5a1 1 0 00-1-1h-1a1 1 0 00-1 1v9a1 1 0 001 1h1a1 1 0 001-1V5z" />
  </svg>
);

const ClockIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm.75-10.25a.75.75 0 00-1.5 0v3.5c0 .414.336.75.75.75h2.5a.75.75 0 000-1.5h-1.75v-2.75z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M4 1.5a.5.5 0 01.5.5v1h7V2a.5.5 0 011 0v1h1a2 2 0 012 2v8a2 2 0 01-2 2H2.5a2 2 0 01-2-2V5a2 2 0 012-2h1V2a.5.5 0 01.5-.5zM2.5 6a.5.5 0 00-.5.5v6.5a1 1 0 001 1h10a1 1 0 001-1V6.5a.5.5 0 00-.5-.5h-11z" clipRule="evenodd" />
  </svg>
);

const RefreshIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 8a5.5 5.5 0 019.9-3.3M13.5 8a5.5 5.5 0 01-9.9 3.3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3h-3M4 11v3h3" />
  </svg>
);

const GridIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zM9 2.5A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zM1 10.5A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zM9 10.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" />
  </svg>
);

// Circular progress indicator
interface UsageCircleProps {
  percentage: number;
  status: 'good' | 'warning' | 'critical';
  size?: number;
}

const UsageCircle: FC<UsageCircleProps> = ({ percentage, status, size = 20 }) => {
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const statusColors = {
    good: 'stroke-emerald-500',
    warning: 'stroke-amber-500',
    critical: 'stroke-red-500',
  };

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-white/[0.08]"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={statusColors[status]}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset,
          transition: 'stroke-dashoffset 0.3s ease',
        }}
      />
    </svg>
  );
};

// Usage row component
interface UsageRowProps {
  label: string;
  percentage: number;
  status: 'good' | 'warning' | 'critical';
  resetsIn: string;
}

const UsageRow: FC<UsageRowProps> = ({ label, percentage, status, resetsIn }) => {
  const statusColors = {
    good: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-red-500',
  };

  const statusLabels = {
    good: 'Good',
    warning: 'Warning',
    critical: 'Critical',
  };

  const statusBadgeColors = {
    good: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
    critical: 'bg-red-500/10 text-red-400 ring-red-500/20',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-text-primary">{label}</span>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'px-1.5 py-0.5 rounded text-[10px] font-medium',
              'ring-1 ring-inset',
              statusBadgeColors[status]
            )}
          >
            {statusLabels[status]}
          </span>
          <span className="text-sm font-semibold text-text-primary tabular-nums">
            {percentage}%
          </span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-1">
        <div
          className={cn('h-full rounded-full transition-all duration-300', statusColors[status])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex items-center gap-1 text-[10px] text-text-muted">
        <RefreshIcon className="h-2.5 w-2.5" />
        <span>Resets in {resetsIn}</span>
      </div>
    </div>
  );
};

export default TopBar;
