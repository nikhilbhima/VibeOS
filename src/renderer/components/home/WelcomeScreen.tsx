import { type FC, useState } from 'react';
import { cn } from '../../lib/utils';

interface WelcomeScreenProps {
  className?: string;
  onStartProject?: (prompt: string) => void;
  onOpenProject?: (projectId: string) => void;
}

interface RecentProject {
  id: string;
  name: string;
  description: string;
  lastOpened: string;
  framework: 'react' | 'next' | 'vue' | 'svelte';
}

/**
 * Premium WelcomeScreen Component
 *
 * Design Philosophy: Hero moment with dramatic atmosphere
 * - Layered gradient background with depth
 * - Glass-morphism input area with glow effects
 * - Premium quick starters with subtle animations
 * - Refined typography and spacing
 */
export const WelcomeScreen: FC<WelcomeScreenProps> = ({
  className,
  onStartProject,
  onOpenProject,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Mock recent projects - in real app this would come from store/database
  const recentProjects: RecentProject[] = [
    { id: '1', name: 'SaaS Landing', description: 'Marketing landing page with pricing', lastOpened: '2 hours ago', framework: 'next' },
    { id: '2', name: 'Admin Dashboard', description: 'Analytics and user management', lastOpened: 'Yesterday', framework: 'react' },
    { id: '3', name: 'Portfolio Site', description: 'Personal portfolio with blog', lastOpened: '3 days ago', framework: 'next' },
  ];

  const frameworkIcons: Record<string, { icon: FC<{ className?: string }>, color: string }> = {
    react: { icon: ReactIcon, color: 'text-cyan-400' },
    next: { icon: NextIcon, color: 'text-white' },
    vue: { icon: VueIcon, color: 'text-emerald-400' },
    svelte: { icon: SvelteIcon, color: 'text-orange-500' },
  };

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
    <div
      className={cn(
        'relative flex flex-col items-center justify-center min-h-full overflow-hidden',
        className
      )}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-bg-base">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-bg-base to-bg-surface" />

        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-[800px] h-[400px]',
            'bg-gradient-radial from-white/[0.02] via-transparent to-transparent',
            'blur-2xl'
          )}
        />

        {/* Subtle grid pattern */}
        <div
          className={cn(
            'absolute inset-0 opacity-[0.02]',
            'bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]',
            'bg-[size:60px_60px]'
          )}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <div
            className={cn(
              'h-16 w-16 rounded-2xl flex items-center justify-center',
              'bg-[#171717]',
              'ring-1 ring-white/[0.08]'
            )}
          >
            <VibeIcon className="h-7 w-7" />
          </div>
        </div>

        {/* Welcome text */}
        <div className="text-center mb-10">
          <h1
            className={cn(
              'text-4xl font-semibold tracking-[-0.02em]',
              'bg-gradient-to-b from-text-primary via-text-primary to-text-secondary',
              'bg-clip-text text-transparent',
              'mb-3'
            )}
          >
            What do you want to build?
          </h1>
          <p className="text-lg text-text-secondary tracking-[-0.01em]">
            Describe your idea and watch it come to life
          </p>
        </div>

        {/* Main input area */}
        <div className="relative">
          {/* Outer glow on focus */}
          <div
            className={cn(
              'absolute -inset-px rounded-[18px] transition-opacity duration-300',
              'bg-gradient-to-b from-accent/30 via-accent/10 to-accent/5',
              isFocused ? 'opacity-100' : 'opacity-0'
            )}
          />

          <div
            className={cn(
              'relative rounded-2xl overflow-hidden',
              'bg-bg-surface/80 backdrop-blur-xl',
              'ring-1 ring-inset',
              isFocused
                ? 'ring-accent/40'
                : 'ring-white/[0.08] hover:ring-white/[0.12]',
              'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.04)]',
              'transition-all duration-200'
            )}
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Build me a modern SaaS landing page with a hero section, features grid, pricing table, and contact form..."
              className={cn(
                'w-full bg-transparent',
                'px-5 py-4 min-h-[130px] resize-none',
                'text-base text-text-primary leading-relaxed',
                'placeholder:text-text-muted/60',
                'focus:outline-none'
              )}
              rows={3}
            />

            {/* Bottom bar */}
            <div
              className={cn(
                'flex items-center justify-between px-4 py-3',
                'border-t border-white/[0.06]',
                'bg-white/[0.02]'
              )}
            >
              <div className="flex items-center gap-1">
                {/* Attach button */}
                <button
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
                    'text-xs font-medium text-text-muted',
                    'hover:text-text-secondary hover:bg-white/[0.04]',
                    'transition-all duration-150'
                  )}
                >
                  <AttachIcon className="h-4 w-4" />
                  <span>Attach</span>
                </button>

              </div>

              {/* Send button */}
              <button
                onClick={handleSubmit}
                disabled={!prompt.trim()}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg',
                  'text-sm font-semibold',
                  'transition-all duration-150',
                  prompt.trim()
                    ? cn(
                        'bg-gradient-to-b from-[hsl(25,90%,52%)] to-[hsl(25,85%,45%)]',
                        'text-white',
                        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_1px_2px_0_rgba(0,0,0,0.15),0_2px_8px_-2px_rgba(234,88,12,0.35)]',
                        'hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_12px_-2px_rgba(234,88,12,0.45)]',
                        'hover:translate-y-[-1px] active:translate-y-[0.5px]'
                      )
                    : cn(
                        'bg-white/[0.04] text-text-muted',
                        'cursor-not-allowed'
                      )
                )}
              >
                <span>Start building</span>
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        {recentProjects.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-text-muted tracking-wide uppercase">
                Recent Projects
              </p>
              <button
                className={cn(
                  'text-xs text-text-muted hover:text-text-secondary',
                  'transition-colors duration-150'
                )}
              >
                View all
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {recentProjects.map((project) => {
                const framework = frameworkIcons[project.framework];
                const FrameworkIcon = framework.icon;
                return (
                  <button
                    key={project.id}
                    onClick={() => onOpenProject?.(project.id)}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className={cn(
                      'group relative text-left p-4 rounded-xl',
                      'bg-white/[0.02] hover:bg-white/[0.04]',
                      'ring-1 ring-inset ring-white/[0.06] hover:ring-white/[0.1]',
                      'transition-all duration-200',
                      'hover:translate-y-[-2px]',
                      hoveredProject === project.id && 'shadow-lg shadow-black/20'
                    )}
                  >
                    {/* Project header */}
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={cn(
                          'h-8 w-8 rounded-lg flex items-center justify-center',
                          'bg-white/[0.04] ring-1 ring-inset ring-white/[0.06]'
                        )}
                      >
                        <FrameworkIcon className={cn('h-4 w-4', framework.color)} />
                      </div>
                      <span className="text-[10px] text-text-muted">
                        {project.lastOpened}
                      </span>
                    </div>

                    {/* Project info */}
                    <h3 className="text-sm font-medium text-text-primary mb-1 truncate">
                      {project.name}
                    </h3>
                    <p className="text-xs text-text-muted line-clamp-2">
                      {project.description}
                    </p>

                    {/* Hover arrow */}
                    <div
                      className={cn(
                        'absolute bottom-4 right-4 opacity-0 translate-x-1',
                        'group-hover:opacity-100 group-hover:translate-x-0',
                        'transition-all duration-200'
                      )}
                    >
                      <ArrowIcon className="h-4 w-4 text-text-muted" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Keyboard hint */}
        <div className="mt-14 text-center">
          <p className="text-sm text-text-muted">
            Press{' '}
            <kbd
              className={cn(
                'inline-flex items-center gap-0.5 px-2 py-1 mx-1',
                'text-xs font-mono text-text-secondary',
                'bg-white/[0.04] rounded-md',
                'ring-1 ring-inset ring-white/[0.08]',
                'shadow-[0_1px_2px_0_rgba(0,0,0,0.2)]'
              )}
            >
              <CommandIcon className="h-3 w-3" />K
            </kbd>{' '}
            to search or open recent projects
          </p>
        </div>
      </div>
    </div>
  );
};

// Icons
const VibeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <path
      d="M3 4L8 12L13 4"
      stroke="url(#vibe-gradient-welcome)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="vibe-gradient-welcome" x1="3" y1="4" x2="13" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" />
        <stop offset="1" stopColor="#FB923C" />
      </linearGradient>
    </defs>
  </svg>
);

const AttachIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// Framework icons
const ReactIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    <ellipse cx="12" cy="12" rx="10" ry="4" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
  </svg>
);

const NextIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-1.5 14.5V7l7 4.75-7 4.75Z" />
  </svg>
);

const VueIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.2 2H14.4L12 6 9.6 2H4.8L12 14.4 19.2 2ZM4.8 2H0L12 22 24 2H19.2L12 14.4 4.8 2Z" />
  </svg>
);

const SvelteIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 5.5c-1.5-2.5-4.5-3.5-7-2.5l-4 2c-2 1-3 3-3 5 0 .5 0 1 .2 1.5-.8.5-1.4 1.2-1.7 2-.5 1.5-.2 3 .5 4.5 1.5 2.5 4.5 3.5 7 2.5l4-2c2-1 3-3 3-5 0-.5 0-1-.2-1.5.8-.5 1.4-1.2 1.7-2 .5-1.5.2-3-.5-4.5Z" />
  </svg>
);

const CommandIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M6 3a3 3 0 00-3 3v1h2V6a1 1 0 011-1h1V3H6zM3 13v1a3 3 0 003 3h1v-2H6a1 1 0 01-1-1v-1H3zm14-7V6a3 3 0 00-3-3h-1v2h1a1 1 0 011 1v1h2zm0 7v1a1 1 0 01-1 1h-1v2h1a3 3 0 003-3v-1h-2zM8 8h4v4H8V8z"
      clipRule="evenodd"
    />
  </svg>
);

// Mode toggle with animated indicator
const ModeToggle: FC = () => {
  const [mode, setMode] = useState<'plan' | 'build'>('build');

  return (
    <div
      className={cn(
        'relative flex items-center gap-0.5 p-1',
        'bg-white/[0.03] rounded-lg',
        'ring-1 ring-inset ring-white/[0.06]'
      )}
    >
      <div
        className={cn(
          'absolute top-1 h-[calc(100%-8px)] rounded-md',
          'bg-white/[0.08]',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]',
          'transition-all duration-200 ease-out'
        )}
        style={{
          width: 'calc(50% - 2px)',
          left: mode === 'plan' ? '4px' : 'calc(50% + 2px)',
        }}
      />

      <button
        onClick={() => setMode('plan')}
        className={cn(
          'relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md',
          'text-xs font-medium',
          'transition-colors duration-150',
          mode === 'plan' ? 'text-text-primary' : 'text-text-muted'
        )}
      >
        <PlanIcon className="h-3.5 w-3.5" />
        <span>Plan</span>
      </button>

      <button
        onClick={() => setMode('build')}
        className={cn(
          'relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md',
          'text-xs font-medium',
          'transition-colors duration-150',
          mode === 'build' ? 'text-text-primary' : 'text-text-muted'
        )}
      >
        <BuildIcon className="h-3.5 w-3.5" />
        <span>Build</span>
      </button>
    </div>
  );
};

// Model selector
type ModelType = 'haiku' | 'sonnet' | 'opus';

const ModelSelector: FC = () => {
  const [selectedModel, setSelectedModel] = useState<ModelType>('sonnet');
  const [isOpen, setIsOpen] = useState(false);

  const models: { id: ModelType; label: string; desc: string }[] = [
    { id: 'haiku', label: 'Haiku', desc: 'Fast' },
    { id: 'sonnet', label: 'Sonnet', desc: 'Balanced' },
    { id: 'opus', label: 'Opus', desc: 'Powerful' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5',
          'bg-white/[0.03] hover:bg-white/[0.06]',
          'rounded-lg',
          'ring-1 ring-inset ring-white/[0.06] hover:ring-white/[0.08]',
          'transition-all duration-150'
        )}
      >
        <span
          className={cn(
            'h-2 w-2 rounded-full',
            'bg-emerald-500',
            'shadow-[0_0_6px_1px_rgba(16,185,129,0.4)]'
          )}
        />
        <span className="text-xs font-medium text-text-secondary capitalize">
          {selectedModel}
        </span>
        <ChevronIcon
          className={cn(
            'h-3 w-3 text-text-muted transition-transform duration-150',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            className={cn(
              'absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50',
              'w-40 py-1',
              'bg-bg-elevated/95 backdrop-blur-xl',
              'rounded-lg',
              'ring-1 ring-white/[0.08]',
              'shadow-[0_8px_30px_-4px_rgba(0,0,0,0.4)]',
              'animate-scale-in origin-bottom'
            )}
          >
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  setSelectedModel(model.id);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2',
                  'text-left transition-colors duration-150',
                  selectedModel === model.id
                    ? 'bg-white/[0.06]'
                    : 'hover:bg-white/[0.04]'
                )}
              >
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    selectedModel === model.id
                      ? 'bg-emerald-500 shadow-[0_0_6px_1px_rgba(16,185,129,0.4)]'
                      : 'bg-text-muted/50'
                  )}
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-text-primary">
                    {model.label}
                  </span>
                  <span className="text-xs text-text-muted ml-1.5">
                    {model.desc}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const PlanIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
  </svg>
);

const BuildIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
      clipRule="evenodd"
    />
  </svg>
);

const ChevronIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
  </svg>
);

export default WelcomeScreen;
