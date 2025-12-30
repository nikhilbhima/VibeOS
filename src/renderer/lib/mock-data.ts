// Mock data for frontend development
// This file provides realistic data for UI development before backend integration

export interface MockProject {
  id: string;
  name: string;
  path: string;
  framework: 'vite' | 'next' | 'static' | null;
  createdAt: number;
  lastOpenedAt: number;
}

export interface MockMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
  toolUse?: {
    name: string;
    status: 'running' | 'completed' | 'error';
    friendlyName: string;
  };
}

export interface MockSession {
  id: string;
  projectId: string;
  name: string;
  startedAt: number;
  endedAt?: number;
  messageCount: number;
}

export interface MockUsageData {
  tokensUsed: number;
  tokenLimit: number;
  costThisSession: number;
  model: 'haiku' | 'sonnet' | 'opus';
}

export interface MockMCPServer {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  icon: string;
}

export interface MockActivity {
  id: string;
  type: 'read' | 'write' | 'edit' | 'bash' | 'search' | 'thinking';
  description: string;
  timestamp: number;
  status: 'running' | 'completed' | 'error';
  file?: string;
}

// Mock Projects
export const mockProjects: MockProject[] = [
  {
    id: '1',
    name: 'my-landing-page',
    path: '/Users/demo/Projects/my-landing-page',
    framework: 'vite',
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    lastOpenedAt: Date.now() - 2 * 60 * 60 * 1000,
  },
  {
    id: '2',
    name: 'client-dashboard',
    path: '/Users/demo/Projects/client-dashboard',
    framework: 'next',
    createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
    lastOpenedAt: Date.now() - 24 * 60 * 60 * 1000,
  },
  {
    id: '3',
    name: 'portfolio-site',
    path: '/Users/demo/Projects/portfolio-site',
    framework: 'vite',
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    lastOpenedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
];

// Mock Messages
export const mockMessages: MockMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Welcome to VibeOS! I\'m Claude, and I\'ll help you build your app. What would you like to create today?',
    timestamp: Date.now() - 5 * 60 * 1000,
  },
  {
    id: '2',
    role: 'user',
    content: 'I want to create a landing page for my SaaS product. It should have a hero section, features grid, pricing table, and a contact form.',
    timestamp: Date.now() - 4 * 60 * 1000,
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Great choice! I\'ll create a beautiful landing page for your SaaS product. Let me set up the project structure and create the components.\n\nHere\'s what I\'ll build:\n- **Hero Section** with headline, subheading, and CTA button\n- **Features Grid** showcasing your product benefits\n- **Pricing Table** with multiple tiers\n- **Contact Form** for lead capture\n\nI\'m starting now...',
    timestamp: Date.now() - 3 * 60 * 1000,
    toolUse: {
      name: 'write',
      status: 'completed',
      friendlyName: 'Creating project files',
    },
  },
  {
    id: '4',
    role: 'assistant',
    content: 'I\'ve created your landing page! Here\'s what I built:\n\n**Files Created:**\n- `src/components/Hero.tsx` - Eye-catching hero with gradient background\n- `src/components/Features.tsx` - 6-card feature grid\n- `src/components/Pricing.tsx` - 3-tier pricing table\n- `src/components/Contact.tsx` - Contact form with validation\n\nThe preview should be updating now. Take a look and let me know if you\'d like any changes!',
    timestamp: Date.now() - 1 * 60 * 1000,
  },
  {
    id: '5',
    role: 'user',
    content: 'This looks great! Can you make the hero section taller and add a subtle animation to the CTA button?',
    timestamp: Date.now() - 30 * 1000,
  },
];

// Mock streaming message (for simulating typing)
export const mockStreamingContent = `I'll make those changes right now. Let me:

1. Increase the hero section height
2. Add a subtle pulse animation to the CTA button

Updating the Hero component...`;

// Mock Sessions
export const mockSessions: MockSession[] = [
  {
    id: 's1',
    projectId: '1',
    name: 'Building landing page',
    startedAt: Date.now() - 2 * 60 * 60 * 1000,
    messageCount: 12,
  },
  {
    id: 's2',
    projectId: '1',
    name: 'Adding contact form',
    startedAt: Date.now() - 24 * 60 * 60 * 1000,
    endedAt: Date.now() - 22 * 60 * 60 * 1000,
    messageCount: 8,
  },
  {
    id: 's3',
    projectId: '2',
    name: 'Dashboard setup',
    startedAt: Date.now() - 48 * 60 * 60 * 1000,
    endedAt: Date.now() - 46 * 60 * 60 * 1000,
    messageCount: 24,
  },
];

// Mock Usage Data
export const mockUsageData: MockUsageData = {
  tokensUsed: 45230,
  tokenLimit: 100000,
  costThisSession: 0.42,
  model: 'sonnet',
};

// Mock MCP Servers (Integrations)
export const mockMCPServers: MockMCPServer[] = [
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Database, Auth, and Storage',
    status: 'connected',
    icon: 'database',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deployment and Hosting',
    status: 'disconnected',
    icon: 'cloud',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Version Control',
    status: 'connected',
    icon: 'git-branch',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payments',
    status: 'disconnected',
    icon: 'credit-card',
  },
];

// Mock Activity Feed
export const mockActivities: MockActivity[] = [
  {
    id: 'a1',
    type: 'thinking',
    description: 'Analyzing your request...',
    timestamp: Date.now() - 5000,
    status: 'completed',
  },
  {
    id: 'a2',
    type: 'read',
    description: 'Reading src/App.tsx',
    timestamp: Date.now() - 4000,
    status: 'completed',
    file: 'src/App.tsx',
  },
  {
    id: 'a3',
    type: 'write',
    description: 'Creating Hero component',
    timestamp: Date.now() - 3000,
    status: 'completed',
    file: 'src/components/Hero.tsx',
  },
  {
    id: 'a4',
    type: 'edit',
    description: 'Updating App.tsx',
    timestamp: Date.now() - 2000,
    status: 'completed',
    file: 'src/App.tsx',
  },
  {
    id: 'a5',
    type: 'bash',
    description: 'Starting preview server',
    timestamp: Date.now() - 1000,
    status: 'running',
  },
];

// Mock File Tree
export interface MockFileNode {
  name: string;
  type: 'file' | 'folder';
  children?: MockFileNode[];
  modified?: boolean;
}

export const mockFileTree: MockFileNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'Hero.tsx', type: 'file', modified: true },
          { name: 'Features.tsx', type: 'file' },
          { name: 'Pricing.tsx', type: 'file' },
          { name: 'Contact.tsx', type: 'file' },
          { name: 'Footer.tsx', type: 'file' },
        ],
      },
      {
        name: 'lib',
        type: 'folder',
        children: [
          { name: 'utils.ts', type: 'file' },
        ],
      },
      { name: 'App.tsx', type: 'file', modified: true },
      { name: 'main.tsx', type: 'file' },
      { name: 'index.css', type: 'file' },
    ],
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { name: 'favicon.ico', type: 'file' },
      { name: 'logo.svg', type: 'file' },
    ],
  },
  { name: 'package.json', type: 'file' },
  { name: 'tsconfig.json', type: 'file' },
  { name: 'vite.config.ts', type: 'file' },
  { name: 'tailwind.config.js', type: 'file' },
];

// Helper to simulate streaming
export function simulateStream(
  content: string,
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  chunkSize = 3,
  delay = 30
): () => void {
  const words = content.split(' ');
  let index = 0;
  let cancelled = false;

  const stream = (): void => {
    if (cancelled || index >= words.length) {
      if (!cancelled) onComplete();
      return;
    }

    const chunk = words.slice(index, index + chunkSize).join(' ') + ' ';
    onChunk(chunk);
    index += chunkSize;

    setTimeout(stream, delay);
  };

  stream();

  return () => {
    cancelled = true;
  };
}

// Model options
export const modelOptions = [
  { id: 'haiku', name: 'Haiku', description: 'Fast & affordable', costPer1k: 0.00025 },
  { id: 'sonnet', name: 'Sonnet', description: 'Balanced', costPer1k: 0.003 },
  { id: 'opus', name: 'Opus', description: 'Most capable', costPer1k: 0.015 },
] as const;

// Keyboard shortcuts reference
export const keyboardShortcuts = [
  { keys: ['Cmd', 'K'], action: 'Open command palette' },
  { keys: ['Cmd', 'N'], action: 'New project' },
  { keys: ['Cmd', 'O'], action: 'Open project' },
  { keys: ['Cmd', 'P'], action: 'Toggle preview' },
  { keys: ['Cmd', 'E'], action: 'Toggle code view' },
  { keys: ['Cmd', 'B'], action: 'Toggle sidebar' },
  { keys: ['Cmd', 'T'], action: 'New tab' },
  { keys: ['Cmd', 'W'], action: 'Close tab' },
  { keys: ['Cmd', ','], action: 'Open settings' },
  { keys: ['Cmd', 'Shift', 'P'], action: 'Toggle Plan/Build mode' },
  { keys: ['Enter'], action: 'Send message' },
  { keys: ['Shift', 'Enter'], action: 'New line in message' },
  { keys: ['Esc'], action: 'Cancel generation' },
] as const;
