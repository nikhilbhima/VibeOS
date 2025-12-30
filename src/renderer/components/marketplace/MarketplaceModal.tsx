import { type FC, useState } from 'react';
import { cn } from '../../lib/utils';

interface MarketplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabId = 'plugins' | 'agents';

interface Plugin {
  id: string;
  name: string;
  description: string;
  author: string;
  downloads: string;
  rating: number;
  installed: boolean;
  icon: string;
  category: string;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  enabled: boolean;
  icon: string;
}

// Mock data
const mockPlugins: Plugin[] = [
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Database, Auth, and Storage integration',
    author: 'Supabase',
    downloads: '125k',
    rating: 4.9,
    installed: true,
    icon: '⚡',
    category: 'Database',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy and host your applications',
    author: 'Vercel',
    downloads: '98k',
    rating: 4.8,
    installed: true,
    icon: '▲',
    category: 'Deployment',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Accept payments and manage subscriptions',
    author: 'Stripe',
    downloads: '87k',
    rating: 4.7,
    installed: false,
    icon: '💳',
    category: 'Payments',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Version control and collaboration',
    author: 'GitHub',
    downloads: '156k',
    rating: 4.9,
    installed: false,
    icon: '🐙',
    category: 'Dev Tools',
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Import designs directly from Figma',
    author: 'Figma',
    downloads: '45k',
    rating: 4.5,
    installed: false,
    icon: '🎨',
    category: 'Design',
  },
  {
    id: 'resend',
    name: 'Resend',
    description: 'Send transactional emails',
    author: 'Resend',
    downloads: '32k',
    rating: 4.6,
    installed: false,
    icon: '✉️',
    category: 'Communication',
  },
];

const mockAgents: Agent[] = [
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    description: 'Reviews code for quality, security vulnerabilities, and best practices',
    capabilities: ['Security audit', 'Performance check', 'Best practices'],
    enabled: true,
    icon: '🔍',
  },
  {
    id: 'tester',
    name: 'QA Tester',
    description: 'Runs tests, finds edge cases, and ensures quality',
    capabilities: ['Unit tests', 'E2E tests', 'Edge cases'],
    enabled: true,
    icon: '🧪',
  },
  {
    id: 'frontend-architect',
    name: 'Frontend Architect',
    description: 'Designs component architecture and state management',
    capabilities: ['Component design', 'State patterns', 'Performance'],
    enabled: false,
    icon: '🏗️',
  },
  {
    id: 'security-auditor',
    name: 'Security Auditor',
    description: 'Finds vulnerabilities and security issues',
    capabilities: ['OWASP checks', 'Dependency audit', 'Input validation'],
    enabled: false,
    icon: '🛡️',
  },
  {
    id: 'documentation',
    name: 'Documentation Writer',
    description: 'Generates docs, comments, and README files',
    capabilities: ['API docs', 'README', 'Code comments'],
    enabled: false,
    icon: '📝',
  },
];

export const MarketplaceModal: FC<MarketplaceModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabId>('plugins');
  const [searchQuery, setSearchQuery] = useState('');
  const [plugins, setPlugins] = useState(mockPlugins);
  const [agents, setAgents] = useState(mockAgents);

  if (!isOpen) return null;

  const filteredPlugins = plugins.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePlugin = (id: string) => {
    setPlugins((prev) =>
      prev.map((p) => (p.id === id ? { ...p, installed: !p.installed } : p))
    );
  };

  const toggleAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full max-w-3xl max-h-[85vh]',
          'bg-bg-elevated rounded-2xl',
          'border border-white/[0.08]',
          'shadow-[0_24px_80px_-12px_rgba(0,0,0,0.9)]',
          'flex flex-col',
          'animate-in'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'h-9 w-9 rounded-xl flex items-center justify-center',
                'bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20',
                'ring-1 ring-white/[0.08]'
              )}
            >
              <MarketplaceIcon className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Marketplace</h2>
              <p className="text-xs text-text-muted">Extend your workspace</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={cn(
              'p-2 rounded-lg',
              'text-text-muted hover:text-text-primary',
              'hover:bg-white/[0.04]',
              'transition-colors'
            )}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 py-3 border-b border-white/[0.06]">
          <TabButton
            active={activeTab === 'plugins'}
            onClick={() => setActiveTab('plugins')}
            icon={<PluginIcon className="h-4 w-4" />}
            label="Plugins"
            count={plugins.filter((p) => p.installed).length}
          />
          <TabButton
            active={activeTab === 'agents'}
            onClick={() => setActiveTab('agents')}
            icon={<AgentIcon className="h-4 w-4" />}
            label="Agents"
            count={agents.filter((a) => a.enabled).length}
          />
        </div>

        {/* Search */}
        <div className="px-6 py-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className={cn(
                'w-full pl-10 pr-4 py-2.5 rounded-lg',
                'bg-white/[0.04] text-text-primary text-sm',
                'placeholder:text-text-muted',
                'ring-1 ring-inset ring-white/[0.08]',
                'focus:outline-none focus:ring-accent/50',
                'transition-all'
              )}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {activeTab === 'plugins' ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredPlugins.map((plugin) => (
                <PluginCard
                  key={plugin.id}
                  plugin={plugin}
                  onToggle={() => togglePlugin(plugin.id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onToggle={() => toggleAgent(agent.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Tab Button
const TabButton: FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}> = ({ active, onClick, icon, label, count }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center gap-2 px-4 py-2 rounded-lg',
      'text-sm font-medium',
      'transition-all duration-150',
      active
        ? 'bg-white/[0.08] text-text-primary'
        : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.04]'
    )}
  >
    {icon}
    <span>{label}</span>
    <span
      className={cn(
        'px-1.5 py-0.5 rounded text-[10px] font-semibold',
        active ? 'bg-accent/20 text-accent' : 'bg-white/[0.06] text-text-muted'
      )}
    >
      {count}
    </span>
  </button>
);

// Plugin Card
const PluginCard: FC<{ plugin: Plugin; onToggle: () => void }> = ({
  plugin,
  onToggle,
}) => (
  <div
    className={cn(
      'p-4 rounded-xl',
      'bg-white/[0.02] hover:bg-white/[0.04]',
      'border border-white/[0.06]',
      'transition-all duration-150',
      'group'
    )}
  >
    <div className="flex items-start gap-3">
      <div
        className={cn(
          'h-10 w-10 rounded-xl flex items-center justify-center text-lg',
          'bg-white/[0.04] ring-1 ring-white/[0.06]'
        )}
      >
        {plugin.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-text-primary truncate">
            {plugin.name}
          </h3>
          <span className="text-[10px] text-text-muted px-1.5 py-0.5 rounded bg-white/[0.04]">
            {plugin.category}
          </span>
        </div>
        <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
          {plugin.description}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[10px] text-text-muted flex items-center gap-1">
            <DownloadIcon className="h-3 w-3" />
            {plugin.downloads}
          </span>
          <span className="text-[10px] text-text-muted flex items-center gap-1">
            <StarIcon className="h-3 w-3 text-amber-400" />
            {plugin.rating}
          </span>
        </div>
      </div>
    </div>
    <button
      onClick={onToggle}
      className={cn(
        'w-full mt-3 py-2 rounded-lg text-xs font-medium',
        'transition-all duration-150',
        plugin.installed
          ? cn(
              'bg-white/[0.04] text-text-secondary',
              'hover:bg-red-500/10 hover:text-red-400',
              'ring-1 ring-inset ring-white/[0.06]'
            )
          : cn(
              'bg-accent text-white',
              'hover:bg-accent-hover'
            )
      )}
    >
      {plugin.installed ? 'Installed' : 'Install'}
    </button>
  </div>
);

// Agent Card
const AgentCard: FC<{ agent: Agent; onToggle: () => void }> = ({
  agent,
  onToggle,
}) => (
  <div
    className={cn(
      'p-4 rounded-xl',
      'bg-white/[0.02] hover:bg-white/[0.04]',
      'border border-white/[0.06]',
      'transition-all duration-150'
    )}
  >
    <div className="flex items-start gap-4">
      <div
        className={cn(
          'h-12 w-12 rounded-xl flex items-center justify-center text-xl',
          'bg-gradient-to-br from-white/[0.06] to-white/[0.02]',
          'ring-1 ring-white/[0.08]'
        )}
      >
        {agent.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-text-primary">{agent.name}</h3>
          <Toggle enabled={agent.enabled} onToggle={onToggle} />
        </div>
        <p className="text-xs text-text-muted mt-1">{agent.description}</p>
        <div className="flex items-center gap-2 mt-3">
          {agent.capabilities.map((cap) => (
            <span
              key={cap}
              className={cn(
                'px-2 py-1 rounded-md text-[10px] font-medium',
                'bg-white/[0.04] text-text-muted',
                'ring-1 ring-inset ring-white/[0.06]'
              )}
            >
              {cap}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Toggle Switch
const Toggle: FC<{ enabled: boolean; onToggle: () => void }> = ({
  enabled,
  onToggle,
}) => (
  <button
    onClick={onToggle}
    className={cn(
      'relative w-10 h-6 rounded-full',
      'transition-colors duration-200',
      enabled ? 'bg-accent' : 'bg-white/[0.08]'
    )}
  >
    <span
      className={cn(
        'absolute top-1 left-1 w-4 h-4 rounded-full',
        'bg-white shadow-sm',
        'transition-transform duration-200',
        enabled && 'translate-x-4'
      )}
    />
  </button>
);

// Icons
const MarketplaceIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
  </svg>
);

const CloseIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PluginIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
  </svg>
);

const AgentIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);

const SearchIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const DownloadIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const StarIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default MarketplaceModal;
