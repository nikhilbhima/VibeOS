import { type FC } from 'react';
import { cn } from '../../lib/utils';
import { type MockActivity } from '../../lib/mock-data';

interface ActivityFeedProps {
  activities: MockActivity[];
  className?: string;
}

/**
 * Premium ActivityFeed Component
 *
 * Design Philosophy: Transparent action log
 * - Glass-morphism styling throughout
 * - Timeline connector between items
 * - Color-coded activity types
 * - Smooth running state animations
 */
export const ActivityFeed: FC<ActivityFeedProps> = ({
  activities,
  className,
}) => {
  const runningCount = activities.filter((a) => a.status === 'running').length;

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-bg-surface/40 backdrop-blur-sm',
        className
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between px-4 py-3',
          'border-b border-white/[0.04]',
          'bg-white/[0.02]'
        )}
      >
        <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider">
          Activity
        </h3>
        {runningCount > 0 && (
          <span
            className={cn(
              'inline-flex items-center gap-1.5',
              'px-2 py-0.5 rounded-full',
              'bg-accent/10 text-accent',
              'text-[10px] font-medium'
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {runningCount} running
          </span>
        )}
      </div>

      {/* Activity list with timeline */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="relative">
          {/* Timeline connector line */}
          <div
            className={cn(
              'absolute left-[15px] top-3 bottom-3 w-px',
              'bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent'
            )}
          />

          {/* Activity items */}
          <div className="space-y-1 relative">
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                isLatest={index === activities.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={cn(
          'px-4 py-3',
          'border-t border-white/[0.04]',
          'bg-white/[0.02]'
        )}
      >
        <button
          className={cn(
            'w-full py-1.5 rounded-md',
            'text-xs text-text-muted',
            'hover:text-text-secondary hover:bg-white/[0.04]',
            'transition-colors duration-150'
          )}
        >
          View full history
        </button>
      </div>
    </div>
  );
};

// Individual activity item - premium timeline style
const ActivityItem: FC<{
  activity: MockActivity;
  isLatest?: boolean;
}> = ({ activity, isLatest }) => {
  const config = getActivityConfig(activity.type);
  const isRunning = activity.status === 'running';
  const isError = activity.status === 'error';

  return (
    <div
      className={cn(
        'group flex items-start gap-3 px-2 py-2 rounded-lg',
        'transition-all duration-200',
        isRunning && isLatest && 'bg-accent/[0.03]',
        'hover:bg-white/[0.02]'
      )}
    >
      {/* Timeline dot */}
      <div className="relative flex-shrink-0 w-[30px] flex items-center justify-center">
        <div
          className={cn(
            'w-7 h-7 rounded-lg flex items-center justify-center',
            'ring-1 ring-inset',
            isRunning
              ? cn(config.bgActive, config.ringActive)
              : isError
                ? 'bg-red-500/10 ring-red-500/20'
                : 'bg-white/[0.04] ring-white/[0.06]'
          )}
        >
          {isRunning ? (
            <svg
              className={cn('w-3.5 h-3.5 animate-spin', config.colorActive)}
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : isError ? (
            <svg
              className="w-3.5 h-3.5 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-1">
        <p
          className={cn(
            'text-xs leading-relaxed',
            isRunning ? 'text-text-primary' : 'text-text-secondary'
          )}
        >
          {activity.description}
        </p>
        {activity.file && (
          <button
            className={cn(
              'mt-1 text-[10px] font-mono',
              'text-accent/80 hover:text-accent',
              'truncate block max-w-full',
              'hover:underline underline-offset-2',
              'transition-colors duration-150'
            )}
          >
            {activity.file}
          </button>
        )}
      </div>

      {/* Time */}
      <span
        className={cn(
          'flex-shrink-0 pt-1 text-[10px] text-text-muted',
          'opacity-60 group-hover:opacity-100',
          'transition-opacity duration-150'
        )}
      >
        {formatTime(activity.timestamp)}
      </span>
    </div>
  );
};

// Get config based on activity type - premium color schemes
function getActivityConfig(type: MockActivity['type']) {
  const configs = {
    thinking: {
      bgActive: 'bg-purple-500/10',
      colorActive: 'text-purple-400',
      ringActive: 'ring-purple-500/20',
    },
    read: {
      bgActive: 'bg-blue-500/10',
      colorActive: 'text-blue-400',
      ringActive: 'ring-blue-500/20',
    },
    write: {
      bgActive: 'bg-emerald-500/10',
      colorActive: 'text-emerald-400',
      ringActive: 'ring-emerald-500/20',
    },
    edit: {
      bgActive: 'bg-amber-500/10',
      colorActive: 'text-amber-400',
      ringActive: 'ring-amber-500/20',
    },
    bash: {
      bgActive: 'bg-accent/10',
      colorActive: 'text-accent',
      ringActive: 'ring-accent/20',
    },
    search: {
      bgActive: 'bg-cyan-500/10',
      colorActive: 'text-cyan-400',
      ringActive: 'ring-cyan-500/20',
    },
  };

  return configs[type] || configs.thinking;
}

// Format timestamp
function formatTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 5) return 'now';
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
}

export default ActivityFeed;
