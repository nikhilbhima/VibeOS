import { type FC, useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import WelcomeScreen from './components/home/WelcomeScreen';
import ChatPanel from './components/chat/ChatPanel';

const App: FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [projectName, setProjectName] = useState<string | undefined>();

  const handleStartProject = (prompt: string) => {
    // In real app, this would create a project and start Claude
    setProjectName('New Project');
    setHasStarted(true);
    console.log('Starting project with prompt:', prompt);
  };

  return (
    <AppLayout>
      {!hasStarted ? (
        <WelcomeScreen onStartProject={handleStartProject} />
      ) : (
        <div className="flex h-full">
          {/* Chat Panel */}
          <ChatPanel className="flex-1" projectName={projectName} />

          {/* Preview Panel */}
          <aside className="w-[400px] flex-shrink-0 border-l border-border-subtle bg-bg-surface/50">
            <PreviewPlaceholder />
          </aside>
        </div>
      )}
    </AppLayout>
  );
};

// Temporary preview placeholder
const PreviewPlaceholder: FC = () => (
  <div className="flex flex-col h-full">
    {/* Preview header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <button className="px-2.5 py-1 text-xs font-medium text-text-primary bg-bg-elevated rounded-md">
            Desktop
          </button>
          <button className="px-2.5 py-1 text-xs text-text-muted hover:text-text-secondary rounded-md transition-colors">
            Tablet
          </button>
          <button className="px-2.5 py-1 text-xs text-text-muted hover:text-text-secondary rounded-md transition-colors">
            Mobile
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-hover rounded-md transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-hover rounded-md transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
    </div>

    {/* Preview content */}
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-bg-elevated border border-border-subtle">
          <svg className="h-8 w-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-text-secondary mb-1">Preview</p>
        <p className="text-xs text-text-muted">Your app will appear here</p>
      </div>
    </div>

    {/* Preview/Code toggle */}
    <div className="flex items-center justify-center px-4 py-3 border-t border-border-subtle">
      <div className="flex items-center gap-1 p-0.5 bg-bg-elevated rounded-lg">
        <button className="px-3 py-1.5 text-xs font-medium text-text-primary bg-bg-surface rounded-md shadow-sm">
          Preview
        </button>
        <button className="px-3 py-1.5 text-xs text-text-muted hover:text-text-secondary rounded-md transition-colors">
          Code
        </button>
      </div>
    </div>
  </div>
);

export default App;
