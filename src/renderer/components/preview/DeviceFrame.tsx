import { type FC } from 'react';
import { cn } from '../../lib/utils';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface DeviceFrameProps {
  device: DeviceType;
  url?: string;
  isLoading?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
}

/**
 * Premium DeviceFrame Component
 *
 * Design Philosophy: Realistic device mockups
 * - Physical device frame appearance
 * - Proper aspect ratios
 * - Loading and error states
 * - Smooth scale transitions
 */
export const DeviceFrame: FC<DeviceFrameProps> = ({
  device,
  url,
  isLoading = false,
  hasError = false,
  errorMessage,
  className,
}) => {
  const frameConfig = getFrameConfig(device);

  return (
    <div
      className={cn(
        'relative transition-all duration-300 ease-out',
        'transform-gpu',
        className
      )}
      style={{
        width: frameConfig.containerWidth,
        maxWidth: '100%',
      }}
    >
      {/* Device frame wrapper */}
      <div
        className={cn(
          'relative mx-auto',
          'bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]',
          'rounded-[24px]',
          'ring-1 ring-inset ring-white/[0.1]',
          'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5),0_4px_16px_-4px_rgba(0,0,0,0.3)]',
          frameConfig.padding
        )}
        style={{
          aspectRatio: frameConfig.aspectRatio,
        }}
      >
        {/* Device bezel reflection */}
        <div
          className={cn(
            'absolute inset-0 rounded-[24px]',
            'bg-gradient-to-b from-white/[0.08] via-transparent to-transparent',
            'pointer-events-none'
          )}
        />

        {/* Screen area */}
        <div
          className={cn(
            'relative w-full h-full',
            'bg-bg-base',
            'rounded-lg overflow-hidden',
            'ring-1 ring-inset ring-black/50'
          )}
        >
          {/* Status bar for mobile/tablet */}
          {(device === 'mobile' || device === 'tablet') && (
            <StatusBar device={device} />
          )}

          {/* Content area */}
          <div
            className={cn(
              'relative',
              device === 'mobile' || device === 'tablet' ? 'h-[calc(100%-28px)]' : 'h-full'
            )}
          >
            {isLoading ? (
              <LoadingState />
            ) : hasError ? (
              <ErrorState message={errorMessage} />
            ) : url ? (
              <iframe
                src={url}
                className="w-full h-full border-0"
                title="Preview"
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>

        {/* Home indicator for mobile */}
        {device === 'mobile' && (
          <div
            className={cn(
              'absolute bottom-2 left-1/2 -translate-x-1/2',
              'w-32 h-1 rounded-full',
              'bg-white/20'
            )}
          />
        )}
      </div>

      {/* Device stand for desktop */}
      {device === 'desktop' && (
        <div className="flex flex-col items-center mt-[-1px]">
          <div
            className={cn(
              'w-24 h-12',
              'bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]',
              'rounded-b-lg'
            )}
          />
          <div
            className={cn(
              'w-40 h-3',
              'bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]',
              'rounded-b-xl',
              'shadow-[0_4px_8px_-2px_rgba(0,0,0,0.3)]'
            )}
          />
        </div>
      )}
    </div>
  );
};

// Status bar for mobile/tablet
const StatusBar: FC<{ device: DeviceType }> = ({ device }) => (
  <div
    className={cn(
      'flex items-center justify-between px-4 h-7',
      'bg-bg-base',
      'border-b border-white/[0.04]'
    )}
  >
    {/* Time */}
    <span className="text-xs font-medium text-text-primary">
      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>

    {/* Status icons */}
    <div className="flex items-center gap-1">
      <SignalIcon className="w-4 h-4 text-text-primary" />
      <WifiIcon className="w-4 h-4 text-text-primary" />
      <BatteryIcon className="w-4 h-4 text-text-primary" />
    </div>
  </div>
);

// Loading state
const LoadingState: FC = () => (
  <div className="flex flex-col items-center justify-center h-full bg-bg-base">
    <div
      className={cn(
        'w-10 h-10 rounded-xl mb-4',
        'bg-gradient-to-br from-accent/20 to-accent/5',
        'ring-1 ring-inset ring-accent/20',
        'flex items-center justify-center'
      )}
    >
      <svg
        className="w-5 h-5 text-accent animate-spin"
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
    </div>
    <p className="text-sm text-text-muted">Loading preview...</p>
  </div>
);

// Error state
const ErrorState: FC<{ message?: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full bg-bg-base p-6">
    <div
      className={cn(
        'w-12 h-12 rounded-xl mb-4',
        'bg-red-500/10',
        'ring-1 ring-inset ring-red-500/20',
        'flex items-center justify-center'
      )}
    >
      <AlertIcon className="w-6 h-6 text-red-400" />
    </div>
    <p className="text-sm font-medium text-text-primary mb-1">Preview Error</p>
    <p className="text-xs text-text-muted text-center max-w-xs">
      {message || 'Unable to load preview. Check your dev server.'}
    </p>
    <button
      className={cn(
        'mt-4 px-4 py-2 rounded-lg',
        'bg-white/[0.04] text-text-secondary',
        'ring-1 ring-inset ring-white/[0.08]',
        'hover:bg-white/[0.06] hover:text-text-primary',
        'text-xs font-medium',
        'transition-all duration-150'
      )}
    >
      Retry
    </button>
  </div>
);

// Empty state
const EmptyState: FC = () => (
  <div className="flex flex-col items-center justify-center h-full bg-bg-base">
    <div
      className={cn(
        'w-16 h-16 rounded-2xl mb-4',
        'bg-white/[0.03]',
        'ring-1 ring-inset ring-white/[0.06]',
        'flex items-center justify-center'
      )}
    >
      <WindowIcon className="w-8 h-8 text-text-muted/40" />
    </div>
    <p className="text-sm text-text-muted">No preview available</p>
    <p className="text-xs text-text-muted/60 mt-1">
      Start building to see your app
    </p>
  </div>
);

// Frame configuration by device type
function getFrameConfig(device: DeviceType) {
  switch (device) {
    case 'desktop':
      return {
        containerWidth: '100%',
        aspectRatio: '16 / 10',
        padding: 'p-3',
      };
    case 'tablet':
      return {
        containerWidth: '480px',
        aspectRatio: '3 / 4',
        padding: 'p-3',
      };
    case 'mobile':
      return {
        containerWidth: '280px',
        aspectRatio: '9 / 19.5',
        padding: 'p-2',
      };
  }
}

// Icons
const SignalIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 20h2V10H2v10zm4 0h2v-7H6v7zm4 0h2V4h-2v16zm4 0h2V7h-2v13zm4 0h2V12h-2v8z" />
  </svg>
);

const WifiIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
  </svg>
);

const BatteryIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2zm0 12H7V7h10v10zm3-9v6h1a1 1 0 001-1V9a1 1 0 00-1-1h-1z" />
  </svg>
);

const AlertIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const WindowIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8V6a2 2 0 012-2h14a2 2 0 012 2v2M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8M3 8h18M7 8V4m4 4V4m4 4V4" />
  </svg>
);

export default DeviceFrame;
