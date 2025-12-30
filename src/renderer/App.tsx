import { type FC, useState, useEffect, useCallback } from 'react';
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppLayout from './components/layout/AppLayout';
import WelcomeScreen from './components/home/WelcomeScreen';
import ChatPanel from './components/chat/ChatPanel';
import PreviewPanel from './components/preview/PreviewPanel';
import { CommandPalette } from './components/modals/CommandPalette';
import { SettingsModal } from './components/modals/SettingsModal';

const App: FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [projectName, setProjectName] = useState<string | undefined>();

  // Modal states
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Preview state
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const handleStartProject = (prompt: string) => {
    // In real app, this would create a project and start Claude
    setProjectName('New Project');
    setHasStarted(true);

    // Simulate preview loading
    setIsPreviewLoading(true);
    setTimeout(() => {
      setIsPreviewLoading(false);
      // In real app, this would be the actual dev server URL
      // setPreviewUrl('http://localhost:5174');
    }, 2000);

    console.log('Starting project with prompt:', prompt);
  };

  // Global keyboard shortcuts
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
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

    // Escape - Close modals
    if (event.key === 'Escape') {
      if (isCommandPaletteOpen) setIsCommandPaletteOpen(false);
      if (isSettingsOpen) setIsSettingsOpen(false);
    }
  }, [isCommandPaletteOpen, isSettingsOpen]);

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
        break;
      // Add more command handlers as needed
      default:
        console.log('Command selected:', command.id);
    }
  };

  return (
    <>
      <AppLayout
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      >
        {!hasStarted ? (
          <WelcomeScreen onStartProject={handleStartProject} />
        ) : (
          <div className="flex h-full">
            {/* Chat Panel */}
            <ChatPanel className="flex-1" projectName={projectName} />

            {/* Preview Panel */}
            <PreviewPanel
              previewUrl={previewUrl}
              isLoading={isPreviewLoading}
              className="w-[480px] flex-shrink-0"
            />
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
