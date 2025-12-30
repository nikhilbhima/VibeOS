import { type FC, useState, useEffect, useCallback } from 'react';
import { cn } from './lib/utils';
import AppLayout from './components/layout/AppLayout';
import WelcomeScreen from './components/home/WelcomeScreen';
import ChatPanel from './components/chat/ChatPanel';
import PreviewPanel from './components/preview/PreviewPanel';
import { CommandPalette } from './components/modals/CommandPalette';
import { SettingsModal } from './components/modals/SettingsModal';
import VibeOrb from './components/ui/VibeOrb';

type ClaudeState = 'idle' | 'thinking' | 'building';

const App: FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [projectName, setProjectName] = useState<string | undefined>();
  const [claudeState, setClaudeState] = useState<ClaudeState>('idle');

  // Modal states
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Panel visibility
  const [showPreview, setShowPreview] = useState(true);

  // Preview state
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const handleStartProject = (prompt: string) => {
    setProjectName('New Project');
    setHasStarted(true);
    setClaudeState('thinking');

    // Simulate Claude thinking then building
    setTimeout(() => {
      setClaudeState('building');
      setIsPreviewLoading(true);
    }, 2000);

    setTimeout(() => {
      setClaudeState('idle');
      setIsPreviewLoading(false);
    }, 5000);

    console.log('Starting project with prompt:', prompt);
  };

  // Global keyboard shortcuts
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Cmd+K - Command Palette
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsCommandPaletteOpen(true);
      }

      // Cmd+, - Settings
      if ((event.metaKey || event.ctrlKey) && event.key === ',') {
        event.preventDefault();
        setIsSettingsOpen(true);
      }

      // Cmd+P - Toggle Preview
      if ((event.metaKey || event.ctrlKey) && event.key === 'p') {
        event.preventDefault();
        setShowPreview((prev) => !prev);
      }

      // Escape - Close modals
      if (event.key === 'Escape') {
        if (isCommandPaletteOpen) setIsCommandPaletteOpen(false);
        if (isSettingsOpen) setIsSettingsOpen(false);
      }
    },
    [isCommandPaletteOpen, isSettingsOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Command palette action handler
  const handleCommand = (command: { id: string }) => {
    setIsCommandPaletteOpen(false);

    switch (command.id) {
      case 'settings':
        setIsSettingsOpen(true);
        break;
      case 'new-project':
        setHasStarted(false);
        setProjectName(undefined);
        setClaudeState('idle');
        break;
      case 'toggle-preview':
        setShowPreview((prev) => !prev);
        break;
      default:
        console.log('Command selected:', command.id);
    }
  };

  return (
    <>
      {/* Ambient background glow - reacts to Claude's state */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-[600px] h-[600px] rounded-full blur-[150px]',
            'transition-all duration-1000 ease-out',
            claudeState === 'idle' && 'bg-[hsl(24,80%,50%)] opacity-[0.04]',
            claudeState === 'thinking' && 'bg-[hsl(260,70%,60%)] opacity-[0.06]',
            claudeState === 'building' && 'bg-[hsl(160,70%,50%)] opacity-[0.06]'
          )}
        />
        {/* Secondary ambient layer for depth */}
        <div
          className={cn(
            'absolute top-[30%] right-[20%]',
            'w-[400px] h-[400px] rounded-full blur-[120px]',
            'animate-ambient-float',
            'transition-all duration-1000 ease-out',
            claudeState === 'idle' && 'bg-[hsl(30,90%,50%)] opacity-[0.03]',
            claudeState === 'thinking' && 'bg-[hsl(280,60%,55%)] opacity-[0.04]',
            claudeState === 'building' && 'bg-[hsl(150,80%,45%)] opacity-[0.04]'
          )}
        />
      </div>

      <AppLayout
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      >
        {!hasStarted ? (
          /* Welcome Screen with VibeOrb */
          <div className="relative h-full flex flex-col items-center justify-center">
            {/* Centered VibeOrb */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <VibeOrb state="idle" size="xl" showAmbient />
            </div>

            {/* Welcome content below orb */}
            <div className="mt-32">
              <WelcomeScreen onStartProject={handleStartProject} />
            </div>
          </div>
        ) : (
          /* Main workspace */
          <div className="relative h-full flex">
            {/* Floating VibeOrb indicator - smaller, positioned */}
            <div
              className={cn(
                'fixed bottom-8 right-8 z-50',
                'transition-all duration-500',
                claudeState === 'idle' ? 'opacity-50 scale-75' : 'opacity-100 scale-100'
              )}
            >
              <VibeOrb
                state={claudeState}
                size="sm"
                showAmbient={claudeState !== 'idle'}
              />
            </div>

            {/* Chat Panel - Takes majority of space */}
            <div
              className={cn(
                'flex-1 transition-all duration-300 ease-out',
                showPreview ? 'mr-0' : 'mr-0'
              )}
            >
              <ChatPanel className="h-full" projectName={projectName} />
            </div>

            {/* Preview Panel - Slides in/out */}
            <div
              className={cn(
                'flex-shrink-0 transition-all duration-300 ease-out overflow-hidden',
                showPreview ? 'w-[480px] opacity-100' : 'w-0 opacity-0'
              )}
            >
              <PreviewPanel
                previewUrl={previewUrl}
                isLoading={isPreviewLoading}
                className="h-full w-[480px]"
              />
            </div>
          </div>
        )}
      </AppLayout>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onCommand={handleCommand}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default App;
