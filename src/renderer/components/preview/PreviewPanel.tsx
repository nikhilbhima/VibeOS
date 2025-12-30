import { type FC, useState } from 'react';
import { cn } from '../../lib/utils';
import DeviceFrame from './DeviceFrame';
import PreviewToolbar from './PreviewToolbar';
import PreviewPlaceholder from './PreviewPlaceholder';

type DeviceType = 'desktop' | 'tablet' | 'mobile';
type ViewMode = 'preview' | 'code';

interface PreviewPanelProps {
  previewUrl?: string;
  isLoading?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
}

/**
 * Premium PreviewPanel Component
 *
 * Design Philosophy: Live development experience
 * - Glass-morphism header with device selector
 * - Responsive device frames
 * - Smooth mode transitions
 * - Integrated console panel
 */
export const PreviewPanel: FC<PreviewPanelProps> = ({
  previewUrl,
  isLoading = false,
  hasError = false,
  errorMessage,
  className,
}) => {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [showConsole, setShowConsole] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleOpenExternal = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-bg-base',
        'border-l border-white/[0.04]',
        className
      )}
    >
      {/* Header with device selector */}
      <div
        className={cn(
          'flex items-center justify-between px-4 py-3',
          'bg-bg-surface/60 backdrop-blur-md',
          'border-b border-white/[0.04]'
        )}
      >
        {/* Device selector */}
        <DeviceSelector device={device} onDeviceChange={setDevice} />

        {/* Toolbar */}
        <PreviewToolbar
          onRefresh={handleRefresh}
          onOpenExternal={handleOpenExternal}
          onToggleConsole={() => setShowConsole(!showConsole)}
          isRefreshing={isRefreshing}
          showConsole={showConsole}
          hasUrl={!!previewUrl}
        />
      </div>

      {/* View mode tabs */}
      <div
        className={cn(
          'flex items-center gap-1 px-4 py-2',
          'border-b border-white/[0.04]',
          'bg-white/[0.02]'
        )}
      >
        <ViewModeTab
          label="Preview"
          isActive={viewMode === 'preview'}
          onClick={() => setViewMode('preview')}
        />
        <ViewModeTab
          label="Code"
          isActive={viewMode === 'code'}
          onClick={() => setViewMode('code')}
        />
      </div>

      {/* Preview area */}
      <div className="flex-1 relative overflow-hidden">
        {viewMode === 'preview' ? (
          <div
            className={cn(
              'absolute inset-0',
              'flex items-center justify-center',
              'p-6',
              'bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.03),transparent_70%)]'
            )}
          >
            {/* Decorative grid */}
            <div
              className={cn(
                'absolute inset-0',
                'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]',
                'bg-[size:24px_24px]',
                'pointer-events-none'
              )}
            />

            {/* Device frame with content */}
            {!previewUrl && !isLoading ? (
              <PreviewPlaceholder />
            ) : (
              <DeviceFrame
                device={device}
                url={previewUrl}
                isLoading={isLoading || isRefreshing}
                hasError={hasError}
                errorMessage={errorMessage}
              />
            )}
          </div>
        ) : (
          <CodeView />
        )}
      </div>

      {/* Console panel (collapsible) */}
      {showConsole && (
        <div
          className={cn(
            'h-48 flex flex-col',
            'border-t border-white/[0.04]',
            'bg-bg-surface/40'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between px-4 py-2',
              'border-b border-white/[0.04]'
            )}
          >
            <span className="text-xs font-medium text-text-secondary">
              Console
            </span>
            <button
              onClick={() => setShowConsole(false)}
              className={cn(
                'p-1 rounded',
                'text-text-muted hover:text-text-primary',
                'hover:bg-white/[0.04]',
                'transition-colors duration-150'
              )}
            >
              <XIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 font-mono text-xs">
            <div className="text-text-muted">No console output</div>
          </div>
        </div>
      )}

      {/* Status bar */}
      <div
        className={cn(
          'flex items-center justify-between px-4 py-2',
          'border-t border-white/[0.04]',
          'bg-white/[0.02]'
        )}
      >
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'w-2 h-2 rounded-full',
              previewUrl ? 'bg-emerald-500' : 'bg-text-muted'
            )}
          />
          <span className="text-xs text-text-muted">
            {previewUrl ? 'Connected' : 'No preview server'}
          </span>
        </div>
        <span className="text-xs text-text-muted font-mono">
          {device === 'desktop'
            ? '1440 x 900'
            : device === 'tablet'
              ? '768 x 1024'
              : '375 x 812'}
        </span>
      </div>
    </div>
  );
};

// Device selector component
const DeviceSelector: FC<{
  device: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
}> = ({ device, onDeviceChange }) => {
  const devices: { type: DeviceType; icon: JSX.Element; label: string }[] = [
    { type: 'desktop', icon: <DesktopIcon className="w-4 h-4" />, label: 'Desktop' },
    { type: 'tablet', icon: <TabletIcon className="w-4 h-4" />, label: 'Tablet' },
    { type: 'mobile', icon: <MobileIcon className="w-4 h-4" />, label: 'Mobile' },
  ];

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 p-1',
        'bg-white/[0.03] rounded-lg',
        'ring-1 ring-inset ring-white/[0.06]'
      )}
    >
      {devices.map(({ type, icon, label }) => (
        <button
          key={type}
          onClick={() => onDeviceChange(type)}
          title={label}
          className={cn(
            'p-2 rounded-md',
            'transition-all duration-150',
            device === type
              ? cn(
                  'bg-white/[0.08] text-text-primary',
                  'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'
                )
              : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.04]'
          )}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

// View mode tab
const ViewModeTab: FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'px-3 py-1.5 rounded-md',
      'text-xs font-medium',
      'transition-all duration-150',
      isActive
        ? cn(
            'bg-white/[0.08] text-text-primary',
            'ring-1 ring-inset ring-white/[0.08]'
          )
        : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.04]'
    )}
  >
    {label}
  </button>
);

// Code view placeholder
const CodeView: FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <CodeIcon className="w-12 h-12 text-text-muted/30 mx-auto mb-3" />
      <p className="text-sm text-text-muted">Code view coming soon</p>
    </div>
  </div>
);

// Icons
const DesktopIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const TabletIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const MobileIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const CodeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const XIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default PreviewPanel;
