import { type FC } from 'react';
import { cn } from '../../lib/utils';
import { type MockActivity } from '../../lib/mock-data';

interface ActivityFeedProps {
  activities: MockActivity[];
  className?: string;
}

export const ActivityFeed: FC<ActivityFeedProps> = ({
  activities,
  className,
}) => {
  return (
    <div className={cn('flex flex-col h-full bg-bg-surface/30', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
        <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider">
          Activity
        </h3>
        <span className="text-xs text-text-muted">
          {activities.filter((a) => a.status === 'running').length} running
        </span>
      </div>

      {/* Activity list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {activities.map((activity, index) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            isLatest={index === activities.length - 1}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-border-subtle">
        <button className="w-full text-xs text-text-muted hover:text-text-secondary transition-colors">
          View full history
        </button>
      </div>
    </div>
  );
};

// Individual activity item
const ActivityItem: FC<{
  activity: MockActivity;
  isLatest?: boolean;
}> = ({ activity, isLatest }) => {
  const config = getActivityConfig(activity.type);

  return (
    <div
      className={cn(
        'flex items-start gap-2 px-2 py-2 rounded-lg',
        'transition-all duration-200',
        isLatest && activity.status === 'running' && 'bg-accent/5',
        'hover:bg-bg-hover/50'
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center',
          activity.status === 'running' ? config.bgActive : 'bg-bg-elevated',
          activity.status === 'error' && 'bg-error/10'
        )}
      >
        {activity.status === 'running' ? (
          <svg
            className={cn('w-3 h-3 animate-spin', config.colorActive)}
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
        ) : activity.status === 'error' ? (
          <svg
            className="w-3 h-3 text-error"
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
            className="w-3 h-3 text-success"
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

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-xs leading-relaxed',
            activity.status === 'running'
              ? 'text-text-primary'
              : 'text-text-secondary'
          )}
        >
          {activity.description}
        </p>
        {activity.file && (
          <button className="mt-0.5 text-[10px] text-accent hover:underline truncate block max-w-full">
            {activity.file}
          </button>
        )}
      </div>

      {/* Time */}
      <span className="flex-shrink-0 text-[10px] text-text-muted">
        {formatTime(activity.timestamp)}
      </span>
    </div>
  );
};

// Get config based on activity type
function getActivityConfig(type: MockActivity['type']) {
  const configs = {
    thinking: {
      bgActive: 'bg-purple-500/10',
      colorActive: 'text-purple-400',
    },
    read: {
      bgActive: 'bg-blue-500/10',
      colorActive: 'text-blue-400',
    },
    write: {
      bgActive: 'bg-green-500/10',
      colorActive: 'text-green-400',
    },
    edit: {
      bgActive: 'bg-amber-500/10',
      colorActive: 'text-amber-400',
    },
    bash: {
      bgActive: 'bg-accent/10',
      colorActive: 'text-accent',
    },
    search: {
      bgActive: 'bg-cyan-500/10',
      colorActive: 'text-cyan-400',
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
