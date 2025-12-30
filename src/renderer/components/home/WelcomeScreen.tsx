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

  // Quick category suggestions - Claude style
  const quickCategories = [
    { id: 'landing', label: 'Landing Page', icon: WebIcon, prompt: 'Create a modern landing page with hero section, features, and pricing' },
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, prompt: 'Build an analytics dashboard with charts and data tables' },
    { id: 'ecommerce', label: 'E-commerce', icon: CartIcon, prompt: 'Create an e-commerce storefront with product listings and cart' },
    { id: 'portfolio', label: 'Portfolio', icon: StarIcon, prompt: 'Design a creative portfolio to showcase my work' },
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

        {/* Main input area - Claude style */}
        <div className="relative">
          {/* Outer glow on focus */}
          <div
            className={cn(
              'absolute -inset-px rounded-[18px] transition-opacity duration-300',
              'bg-gradient-to-b from-accent/20 via-accent/5 to-transparent',
              isFocused ? 'opacity-100' : 'opacity-0'
            )}
          />

          <div
            className={cn(
              'relative rounded-2xl overflow-hidden',
              'bg-[#2a2a2a]',
              'ring-1 ring-inset',
              isFocused
                ? 'ring-white/[0.15]'
                : 'ring-white/[0.08] hover:ring-white/[0.12]',
              'transition-all duration-200'
            )}
          >
            {/* Input area */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="How can I help you today?"
              className={cn(
                'w-full bg-transparent',
                'px-5 pt-5 pb-3 min-h-[80px] resize-none',
                'text-[17px] text-text-primary leading-relaxed',
                'placeholder:text-text-muted/50',
                'focus:outline-none'
              )}
              rows={2}
            />

            {/* Bottom bar */}
            <div className="flex items-center justify-between px-4 pb-4">
              {/* Left controls */}
              <div className="flex items-center gap-1">
                <button
                  className={cn(
                    'p-2 rounded-lg',
                    'text-text-muted hover:text-text-secondary',
                    'hover:bg-white/[0.04]',
                    'transition-all duration-150'
                  )}
                  title="Add context"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
                <button
                  className={cn(
                    'p-2 rounded-lg',
                    'text-text-muted hover:text-text-secondary',
                    'hover:bg-white/[0.04]',
                    'transition-all duration-150'
                  )}
                  title="Recent prompts"
                >
                  <HistoryIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-2">
                {/* Model selector */}
                <ModelSelector />

                {/* Send button */}
                <button
                  onClick={handleSubmit}
                  disabled={!prompt.trim()}
                  className={cn(
                    'p-2.5 rounded-lg',
                    'transition-all duration-150',
                    prompt.trim()
                      ? cn(
                          'bg-[hsl(25,80%,50%)]',
                          'text-white',
                          'hover:bg-[hsl(25,80%,55%)]',
                          'shadow-sm'
                        )
                      : cn(
                          'bg-[hsl(25,60%,40%)]',
                          'text-white/50',
                          'cursor-not-allowed'
                        )
                  )}
                >
                  <SendArrowIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick category buttons - Claude style */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {quickCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setPrompt(category.prompt)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-full',
                'bg-transparent',
                'ring-1 ring-inset ring-white/[0.12]',
                'text-sm text-text-secondary',
                'hover:bg-white/[0.04] hover:ring-white/[0.16]',
                'transition-all duration-150'
              )}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          ))}
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
                if (!framework) return null;
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

const ChevronIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
  </svg>
);

// Input control icons
const PlusIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const HistoryIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const SendArrowIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M2.5 8a.5.5 0 01.5-.5h8.793L8.646 4.354a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L11.793 8.5H3a.5.5 0 01-.5-.5z" />
  </svg>
);

// Category icons
const WebIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
  </svg>
);

const DashboardIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
  </svg>
);

const CartIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

const StarIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default WelcomeScreen;
