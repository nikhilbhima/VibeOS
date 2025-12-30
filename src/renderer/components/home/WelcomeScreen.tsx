import { type FC, useState } from 'react';
import { cn } from '../../lib/utils';

interface WelcomeScreenProps {
  className?: string;
  onStartProject?: (prompt: string) => void;
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ className, onStartProject }) => {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const quickStarters = [
    { label: 'Landing page', icon: '🎨' },
    { label: 'Dashboard', icon: '📊' },
    { label: 'E-commerce', icon: '🛒' },
    { label: 'Portfolio', icon: '✨' },
  ];

  const handleSubmit = () => {
    if (prompt.trim() && onStartProject) {
      onStartProject(prompt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={cn('relative flex flex-col items-center justify-center min-h-full overflow-hidden', className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-bg-base">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple-500/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Welcome text */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-text-primary mb-3">
            What do you want to build?
          </h1>
          <p className="text-lg text-text-secondary">
            Describe your idea and watch it come to life
          </p>
        </div>

        {/* Main input area */}
        <div
          className={cn(
            'relative rounded-2xl border bg-bg-surface/80 backdrop-blur-xl transition-all duration-200',
            isFocused
              ? 'border-accent/50 shadow-lg shadow-accent/10'
              : 'border-border-default hover:border-border-strong'
          )}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Build me a modern SaaS landing page with pricing section..."
            className="w-full bg-transparent px-5 py-4 text-base text-text-primary placeholder:text-text-muted resize-none focus:outline-none min-h-[120px]"
            rows={3}
          />

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border-subtle">
            <div className="flex items-center gap-2">
              {/* Attach button */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted hover:text-text-secondary hover:bg-bg-hover rounded-lg transition-colors">
                <AttachIcon className="h-4 w-4" />
                <span>Attach</span>
              </button>

              {/* Template button */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted hover:text-text-secondary hover:bg-bg-hover rounded-lg transition-colors">
                <TemplateIcon className="h-4 w-4" />
                <span>Templates</span>
              </button>
            </div>

            {/* Send button */}
            <button
              onClick={handleSubmit}
              disabled={!prompt.trim()}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                prompt.trim()
                  ? 'bg-accent text-white hover:bg-accent-hover'
                  : 'bg-bg-elevated text-text-muted cursor-not-allowed'
              )}
            >
              <span>Start building</span>
              <ArrowIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick starters */}
        <div className="mt-6">
          <p className="text-xs text-text-muted text-center mb-3">Quick start with a template</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {quickStarters.map((starter) => (
              <button
                key={starter.label}
                onClick={() => setPrompt(`Create a ${starter.label.toLowerCase()}`)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary bg-bg-surface/60 hover:bg-bg-elevated border border-border-subtle hover:border-border-default rounded-full transition-all duration-150"
              >
                <span>{starter.icon}</span>
                <span>{starter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent projects hint */}
        <div className="mt-12 text-center">
          <p className="text-sm text-text-muted">
            Press <kbd className="px-1.5 py-0.5 text-xs bg-bg-elevated border border-border-subtle rounded">⌘K</kbd> to search or open recent projects
          </p>
        </div>
      </div>
    </div>
  );
};

// Icons
const AttachIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);

const TemplateIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const ArrowIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default WelcomeScreen;
