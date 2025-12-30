import { type FC, useState } from 'react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  className?: string;
  onCollapse?: (collapsed: boolean) => void;
  onOpenMarketplace?: () => void;
}

type NavSection = 'home' | 'search' | 'all' | 'starred' | 'recent';

/**
 * Premium Sidebar Component
 *
 * Design Philosophy: Refined navigation with depth and hierarchy
 * - Glass-morphism background with subtle blur
 * - Active states with indicator pill
 * - Premium workspace selector with gradient
 * - Animated collapse/expand transitions
 */
export const Sidebar: FC<SidebarProps> = ({ className, onCollapse, onOpenMarketplace }) => {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    onCollapse?.(collapsed);
  };

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: HomeIcon },
    { id: 'search' as const, label: 'Search', icon: SearchIcon, shortcut: '⌘K' },
  ];

  const projectItems = [
    { id: 'all' as const, label: 'All Projects', icon: GridIcon, count: 12 },
    { id: 'starred' as const, label: 'Starred', icon: StarIcon, count: 3 },
    { id: 'recent' as const, label: 'Recent', icon: ClockIcon },
  ];


  // Integrations (merged from Plugins - user-friendly names)
  const integrations = [
    { id: 'supabase', name: 'Supabase', description: 'Database & Auth', status: 'connected' as const },
    { id: 'vercel', name: 'Vercel', description: 'Deployment', status: 'available' as const },
    { id: 'stripe', name: 'Stripe', description: 'Payments', status: 'available' as const },
    { id: 'github', name: 'GitHub', description: 'Version control', status: 'available' as const },
  ];

  // Collapsed sidebar
  if (isCollapsed) {
    return (
      <aside
        className={cn(
          'w-[52px] flex-shrink-0 flex flex-col',
          // Glass background
          'bg-bg-surface/40 backdrop-blur-xl',
          // Border with inner glow
          'border-r border-white/[0.04]',
          'shadow-[inset_-1px_0_0_0_rgba(255,255,255,0.02)]',
          // Transition
          'transition-all duration-200 ease-out',
          className
        )}
      >
        {/* Expand button */}
        <button
          onClick={() => handleCollapse(false)}
          className={cn(
            'p-3 m-2 rounded-lg',
            'text-text-muted hover:text-text-primary',
            'hover:bg-white/[0.04]',
            'transition-all duration-150'
          )}
        >
          <MenuIcon className="h-5 w-5" />
        </button>

        {/* Collapsed nav icons */}
        <nav className="flex-1 flex flex-col items-center gap-1 p-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                'p-2.5 rounded-lg transition-all duration-150',
                activeSection === item.id
                  ? 'bg-white/[0.08] text-text-primary'
                  : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.04]'
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
            </button>
          ))}

          <div className="w-6 h-px bg-white/[0.06] my-2" />

          {projectItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                'p-2.5 rounded-lg transition-all duration-150',
                activeSection === item.id
                  ? 'bg-white/[0.08] text-text-primary'
                  : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.04]'
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
            </button>
          ))}
        </nav>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        'w-60 flex-shrink-0 flex flex-col',
        // Glass background
        'bg-bg-surface/40 backdrop-blur-xl',
        // Border with inner glow
        'border-r border-white/[0.04]',
        'shadow-[inset_-1px_0_0_0_rgba(255,255,255,0.02)]',
        // Transition
        'transition-all duration-200 ease-out',
        className
      )}
    >
      {/* Workspace Selector */}
      <div className="p-3">
        <button
          className={cn(
            'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg',
            'bg-white/[0.03] hover:bg-white/[0.06]',
            'ring-1 ring-inset ring-white/[0.06] hover:ring-white/[0.08]',
            'transition-all duration-150'
          )}
        >
          {/* Workspace avatar with gradient */}
          <div
            className={cn(
              'h-7 w-7 rounded-lg flex items-center justify-center',
              'bg-gradient-to-br from-[hsl(280,70%,50%)] to-[hsl(320,70%,45%)]',
              'shadow-[0_2px_8px_-2px_rgba(168,85,247,0.4),inset_0_1px_0_0_rgba(255,255,255,0.15)]',
              'text-[11px] font-bold text-white'
            )}
          >
            V
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="text-sm font-medium text-text-primary truncate">
              My Workspace
            </div>
            <div className="text-[10px] text-text-muted">Pro Plan</div>
          </div>
          <ChevronUpDownIcon className="h-4 w-4 text-text-muted flex-shrink-0" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 pb-2 space-y-4">
        {/* Main Nav */}
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              shortcut={item.shortcut}
              isActive={activeSection === item.id}
              isHovered={hoveredItem === item.id}
              onClick={() => setActiveSection(item.id)}
              onHover={(hovered) => setHoveredItem(hovered ? item.id : null)}
            />
          ))}
        </div>

        {/* Projects Section */}
        <SidebarSection title="Projects">
          {projectItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              count={item.count}
              isActive={activeSection === item.id}
              isHovered={hoveredItem === item.id}
              onClick={() => setActiveSection(item.id)}
              onHover={(hovered) => setHoveredItem(hovered ? item.id : null)}
            />
          ))}
        </SidebarSection>

        {/* Integrations - Simple, user-friendly */}
        <SidebarSection title="Integrations">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className={cn(
                'flex items-center gap-2.5 px-2 py-1.5 rounded-lg',
                'hover:bg-white/[0.04]',
                'transition-all duration-150',
                'cursor-pointer group'
              )}
            >
              <div
                className={cn(
                  'h-6 w-6 rounded-md flex items-center justify-center',
                  integration.status === 'connected'
                    ? 'bg-accent/10 ring-1 ring-inset ring-accent/20'
                    : 'bg-white/[0.04] ring-1 ring-inset ring-white/[0.06]'
                )}
              >
                <IntegrationIcon
                  className={cn(
                    'h-3.5 w-3.5',
                    integration.status === 'connected' ? 'text-accent' : 'text-text-muted'
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    'text-sm truncate',
                    integration.status === 'connected' ? 'text-text-secondary' : 'text-text-muted'
                  )}
                >
                  {integration.name}
                </div>
              </div>
              {integration.status === 'connected' ? (
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    'bg-emerald-500',
                    'shadow-[0_0_4px_1px_rgba(16,185,129,0.4)]'
                  )}
                />
              ) : (
                <button
                  className={cn(
                    'px-2 py-0.5 rounded text-[10px] font-medium',
                    'bg-white/[0.06] text-text-muted',
                    'hover:bg-white/[0.08] hover:text-text-secondary',
                    'transition-colors duration-150'
                  )}
                >
                  Connect
                </button>
              )}
            </div>
          ))}
          {/* Browse Marketplace Button */}
          <button
            onClick={onOpenMarketplace}
            className={cn(
              'w-full flex items-center gap-2.5 px-2 py-1.5 mt-2 rounded-lg',
              'text-sm text-text-muted',
              'hover:text-text-secondary hover:bg-white/[0.04]',
              'transition-all duration-150',
              'ring-1 ring-inset ring-white/[0.06] ring-dashed'
            )}
          >
            <div
              className={cn(
                'h-6 w-6 rounded-md flex items-center justify-center',
                'bg-white/[0.04] ring-1 ring-inset ring-white/[0.06]'
              )}
            >
              <MarketplaceIcon className="h-3.5 w-3.5 text-text-muted" />
            </div>
            <span>Browse Marketplace</span>
          </button>
        </SidebarSection>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/[0.04]">
        {/* Collapse Button */}
        <button
          onClick={() => handleCollapse(true)}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-2 rounded-lg',
            'text-xs text-text-muted hover:text-text-secondary',
            'hover:bg-white/[0.04]',
            'transition-all duration-150'
          )}
        >
          <CollapseIcon className="h-4 w-4" />
          <span>Collapse sidebar</span>
        </button>
      </div>
    </aside>
  );
};

// Sidebar Section
interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection: FC<SidebarSectionProps> = ({ title, children }) => (
  <div>
    <h3
      className={cn(
        'px-2 mb-1.5',
        'text-[10px] font-semibold text-text-muted/70',
        'uppercase tracking-[0.08em]'
      )}
    >
      {title}
    </h3>
    <div className="space-y-0.5">{children}</div>
  </div>
);

// Nav Item
interface NavItemProps {
  icon: FC<{ className?: string }>;
  label: string;
  shortcut?: string;
  count?: number;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}

const NavItem: FC<NavItemProps> = ({
  icon: Icon,
  label,
  shortcut,
  count,
  isActive,
  onClick,
  onHover,
}) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={cn(
        'relative w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg',
        'text-sm font-medium',
        'transition-all duration-150',
        isActive
          ? 'text-text-primary'
          : 'text-text-secondary hover:text-text-primary'
      )}
    >
      {/* Active indicator */}
      {isActive && (
        <div
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2',
            'w-0.5 h-4 rounded-full',
            'bg-accent',
            'shadow-[0_0_8px_0_rgba(234,88,12,0.5)]'
          )}
        />
      )}

      {/* Background */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg transition-all duration-150',
          isActive
            ? 'bg-white/[0.06]'
            : 'hover:bg-white/[0.04]'
        )}
      />

      {/* Content */}
      <Icon className="relative h-4 w-4 flex-shrink-0" />
      <span className="relative flex-1 text-left truncate">{label}</span>

      {/* Count badge */}
      {count !== undefined && (
        <span
          className={cn(
            'relative px-1.5 py-0.5 rounded text-[10px] font-medium',
            'bg-white/[0.06] text-text-muted'
          )}
        >
          {count}
        </span>
      )}

      {/* Shortcut */}
      {shortcut && (
        <kbd
          className={cn(
            'relative px-1.5 py-0.5 rounded text-[10px] font-mono',
            'bg-white/[0.04] text-text-muted',
            'ring-1 ring-inset ring-white/[0.06]'
          )}
        >
          {shortcut}
        </kbd>
      )}
    </button>
  );
};

// Icons
const HomeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const SearchIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const GridIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const StarIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ClockIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const IntegrationIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
  </svg>
);

const MenuIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

const CollapseIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ChevronUpDownIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const MarketplaceIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
  </svg>
);

export default Sidebar;
