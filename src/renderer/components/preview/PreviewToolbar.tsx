import { type FC } from 'react';
import { cn } from '../../lib/utils';

interface PreviewToolbarProps {
  onRefresh: () => void;
  onOpenExternal: () => void;
  onToggleConsole: () => void;
  isRefreshing?: boolean;
  showConsole?: boolean;
  hasUrl?: boolean;
  className?: string;
}

/**
 * Premium PreviewToolbar Component
 *
 * Design Philosophy: Quick preview actions
 * - Glass-morphism action buttons
 * - Smooth loading states
 * - Clear visual feedback
 */
export const PreviewToolbar: FC<PreviewToolbarProps> = ({
  onRefresh,
  onOpenExternal,
  onToggleConsole,
  isRefreshing = false,
  showConsole = false,
  hasUrl = false,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {/* Refresh button */}
      <ToolbarButton
        icon={
          <RefreshIcon
            className={cn('w-4 h-4', isRefreshing && 'animate-spin')}
          />
        }
        onClick={onRefresh}
        disabled={!hasUrl || isRefreshing}
        tooltip="Refresh preview"
      />

      {/* Console toggle */}
      <ToolbarButton
        icon={<ConsoleIcon className="w-4 h-4" />}
        onClick={onToggleConsole}
        isActive={showConsole}
        tooltip={showConsole ? 'Hide console' : 'Show console'}
      />

      {/* Divider */}
      <div className="w-px h-4 bg-white/[0.08] mx-1" />

      {/* Open external */}
      <ToolbarButton
        icon={<ExternalIcon className="w-4 h-4" />}
        onClick={onOpenExternal}
        disabled={!hasUrl}
        tooltip="Open in browser"
      />
    </div>
  );
};

// Toolbar button component
const ToolbarButton: FC<{
  icon: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  tooltip?: string;
}> = ({ icon, onClick, disabled = false, isActive = false, tooltip }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={tooltip}
    className={cn(
      'p-2 rounded-lg',
      'transition-all duration-150',
      disabled
        ? 'text-text-muted/40 cursor-not-allowed'
        : isActive
          ? cn(
              'bg-white/[0.08] text-text-primary',
              'ring-1 ring-inset ring-white/[0.08]'
            )
          : cn(
              'text-text-muted',
              'hover:text-text-primary hover:bg-white/[0.04]'
            )
    )}
  >
    {icon}
  </button>
);

// Icons
const RefreshIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const ConsoleIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ExternalIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default PreviewToolbar;
