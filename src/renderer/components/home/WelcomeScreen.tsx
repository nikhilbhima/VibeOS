import { type FC, useState } from 'react';
import { cn } from '../../lib/utils';

interface WelcomeScreenProps {
  className?: string;
  onStartProject?: (prompt: string) => void;
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
}) => {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [hoveredStarter, setHoveredStarter] = useState<string | null>(null);

  const quickStarters = [
    { id: 'landing', label: 'Landing Page', icon: LayoutIcon, color: 'from-violet-500 to-purple-600' },
    { id: 'dashboard', label: 'Dashboard', icon: ChartIcon, color: 'from-blue-500 to-cyan-500' },
    { id: 'ecommerce', label: 'E-commerce', icon: CartIcon, color: 'from-emerald-500 to-teal-500' },
    { id: 'portfolio', label: 'Portfolio', icon: SparklesIcon, color: 'from-amber-500 to-orange-500' },
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

        {/* Radial gradients for depth */}
        <div
          className={cn(
            'absolute top-0 left-1/4 w-[600px] h-[600px]',
            'bg-gradient-radial from-accent/8 via-accent/2 to-transparent',
            'blur-3xl opacity-60'
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 right-1/4 w-[500px] h-[500px]',
            'bg-gradient-radial from-purple-500/8 via-purple-500/2 to-transparent',
            'blur-3xl opacity-50'
          )}
        />
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
        {/* Welcome text - works with VibeOrb above */}
        <div className="text-center mb-10 animate-stagger-reveal stagger-1">
          <h1
            className={cn(
              'text-5xl font-bold tracking-[-0.03em]',
              'bg-gradient-to-b from-text-primary via-text-primary/90 to-text-secondary/80',
              'bg-clip-text text-transparent',
              'mb-4'
            )}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What do you want to build?
          </h1>
          <p className="text-lg text-text-secondary/80 tracking-[-0.01em]">
            Describe your idea and watch it come to life
          </p>
        </div>

        {/* Main input area */}
        <div className="relative animate-stagger-reveal stagger-2">
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

                {/* Template button */}
                <button
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
                    'text-xs font-medium text-text-muted',
                    'hover:text-text-secondary hover:bg-white/[0.04]',
                    'transition-all duration-150'
                  )}
                >
                  <TemplateIcon className="h-4 w-4" />
                  <span>Templates</span>
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

        {/* Quick starters */}
        <div className="mt-8 animate-stagger-reveal stagger-3">
          <p className="text-xs text-text-muted text-center mb-4 tracking-wide uppercase">
            Or start with a template
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {quickStarters.map((starter) => (
              <button
                key={starter.id}
                onClick={() =>
                  setPrompt(`Create a ${starter.label.toLowerCase()}`)
                }
                onMouseEnter={() => setHoveredStarter(starter.id)}
                onMouseLeave={() => setHoveredStarter(null)}
                className={cn(
                  'group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl',
                  'bg-white/[0.03] hover:bg-white/[0.06]',
                  'ring-1 ring-inset ring-white/[0.06] hover:ring-white/[0.1]',
                  'transition-all duration-200',
                  'hover:translate-y-[-1px]'
                )}
              >
                {/* Icon with gradient background */}
                <div
                  className={cn(
                    'h-7 w-7 rounded-lg flex items-center justify-center',
                    'bg-gradient-to-br',
                    starter.color,
                    'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]',
                    'transition-transform duration-200',
                    hoveredStarter === starter.id && 'scale-110'
                  )}
                >
                  <starter.icon className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                  {starter.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="mt-14 text-center animate-stagger-reveal stagger-4">
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
const BoltIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
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

const TemplateIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
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

const LayoutIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
  </svg>
);

const ChartIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);

const CartIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

const SparklesIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
      clipRule="evenodd"
    />
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

export default WelcomeScreen;
