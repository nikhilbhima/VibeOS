import { type FC } from 'react';
import { cn } from '../../lib/utils';

interface PreviewPlaceholderProps {
  className?: string;
}

/**
 * Premium PreviewPlaceholder Component
 *
 * Design Philosophy: Inviting empty state
 * - Gradient icon with glow
 * - Clear call-to-action
 * - Subtle animation
 */
export const PreviewPlaceholder: FC<PreviewPlaceholderProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        'w-full max-w-md mx-auto',
        'text-center',
        className
      )}
    >
      {/* Animated icon */}
      <div className="relative mb-6">
        {/* Outer glow ring */}
        <div
          className={cn(
            'absolute -inset-4 rounded-3xl',
            'bg-gradient-to-b from-accent/10 via-accent/5 to-transparent',
            'blur-xl opacity-60'
          )}
        />

        {/* Icon container */}
        <div
          className={cn(
            'relative w-20 h-20 rounded-2xl',
            'bg-gradient-to-br from-[hsl(25,90%,52%)] to-[hsl(20,80%,40%)]',
            'flex items-center justify-center',
            'shadow-[0_4px_20px_-4px_rgba(234,88,12,0.4),inset_0_1px_0_0_rgba(255,255,255,0.15)]',
            'ring-1 ring-white/10'
          )}
        >
          <PreviewIcon className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary mb-2 tracking-[-0.01em]">
        Live Preview
      </h3>

      {/* Description */}
      <p className="text-sm text-text-muted leading-relaxed mb-6 max-w-xs">
        Your app will appear here as you build. Start a conversation to see the
        magic happen.
      </p>

      {/* Feature hints */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <FeatureHint icon={<DesktopIcon className="w-3.5 h-3.5" />} label="Device preview" />
        <FeatureHint icon={<RefreshIcon className="w-3.5 h-3.5" />} label="Hot reload" />
        <FeatureHint icon={<ConsoleIcon className="w-3.5 h-3.5" />} label="Console" />
      </div>
    </div>
  );
};

// Feature hint badge
const FeatureHint: FC<{ icon: JSX.Element; label: string }> = ({
  icon,
  label,
}) => (
  <div
    className={cn(
      'inline-flex items-center gap-1.5',
      'px-3 py-1.5 rounded-full',
      'bg-white/[0.03]',
      'ring-1 ring-inset ring-white/[0.06]',
      'text-xs text-text-muted'
    )}
  >
    {icon}
    <span>{label}</span>
  </div>
);

// Icons
const PreviewIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const DesktopIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

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

export default PreviewPlaceholder;
