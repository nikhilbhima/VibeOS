# VibeOS - Premium Claude Code GUI

## Project Vision
"If Anthropic built a GUI for Claude Code, this would be it."

VibeOS is a desktop application that provides a visual interface for Claude Code,
targeting vibe coders who want Lovable's UX with Claude Code's power.

## Architecture Overview

### Process Model (Electron)
- **Main Process** (Node.js): Window management, IPC, Claude Code subprocess via node-pty
- **Preload Script**: Context bridge, secure IPC exposure
- **Renderer Process** (Browser): React 19 app, Zustand state, Tailwind styling

### Core Integration
- Claude Code CLI spawned via node-pty with `--output-format stream-json`
- Parse JSON events: assistant, tool_use, tool_result, error, system
- Preview server: Auto-detect framework (Vite/Next/static), spawn dev server

## Critical Security Rules

### Electron Security (MANDATORY)
- ALWAYS: contextIsolation: true
- NEVER: nodeIntegration: true
- VALIDATE: All IPC message arguments
- SANITIZE: All file paths before operations
- NEVER: Execute dynamic code (no eval, no Function constructor)

### IPC Pattern
All communication between renderer and main MUST go through:
1. Renderer calls window.api.* (exposed by preload)
2. Preload uses ipcRenderer.invoke()
3. Main handles via ipcMain.handle()
4. NEVER expose ipcRenderer directly

## Code Standards

### TypeScript
- Strict mode enabled
- No `any` types - use `unknown` and narrow
- Explicit return types on functions
- Interfaces over types for objects

### React
- Functional components only (no classes)
- Custom hooks for logic reuse
- React.memo for expensive renders
- Error boundaries at panel level

### Styling
- Tailwind CSS exclusively (no CSS files except globals)
- Design tokens via CSS variables
- cn() utility for conditional classes
- No inline styles except dynamic values

### File Naming
- Components: PascalCase.tsx (e.g., ChatPanel.tsx)
- Hooks: camelCase with use prefix (e.g., useClaudeStream.ts)
- Stores: camelCase with Store suffix (e.g., chatStore.ts)
- Types: PascalCase with .types.ts (e.g., Message.types.ts)

### Import Order (enforced by ESLint)
1. React and react-dom
2. External packages (alphabetical)
3. Internal @/components
4. Internal @/lib and @/hooks
5. Internal @/stores
6. Types
7. Relative imports (./)

## Design System

### Colors (Dark Mode Primary)
```css
--bg-base: hsl(30, 18%, 5%);
--bg-surface: hsl(30, 15%, 8%);
--bg-elevated: hsl(30, 12%, 12%);
--bg-hover: hsl(30, 10%, 15%);
--border-subtle: hsl(30, 10%, 15%);
--border-default: hsl(30, 10%, 20%);
--text-primary: hsl(30, 20%, 95%);
--text-secondary: hsl(30, 10%, 65%);
--accent: hsl(25, 84%, 55%);
```

### Typography
- UI: Inter Variable (sans-serif)
- Code: JetBrains Mono (monospace)
- Base: 14px, Line height: 1.5

### Spacing
- Grid: 4px base (space-1 = 4px, space-2 = 8px...)
- Component padding: 12-16px
- Section gaps: 24px

### Animations
- Duration: 150ms (micro), 200ms (standard), 300ms (emphasis)
- Easing: ease-out for exits, cubic-bezier(0.175, 0.885, 0.32, 1.275) for springs
- No animation on first render

## Key Files Reference

### Main Process
- src/main/index.ts - Window creation, IPC registration
- src/main/managers/claude-manager.ts - Claude Code subprocess (CRITICAL)
- src/main/managers/preview-manager.ts - Dev server management (CRITICAL)

### Renderer
- src/renderer/App.tsx - Root component, providers
- src/renderer/components/chat/ChatPanel.tsx - Main chat interface
- src/renderer/components/preview/PreviewPanel.tsx - Live preview
- src/renderer/stores/chatStore.ts - Chat state management

### Shared
- src/shared/types/claude.ts - Claude event types
- src/shared/types/project.ts - Project types

## Commands
- npm run dev - Start development (Vite + Electron)
- npm run build - Production build
- npm run build:mac - Build macOS DMG
- npm run typecheck - TypeScript check
- npm run lint - ESLint
- npm run test - Vitest unit tests
- npm run test:e2e - Playwright E2E tests

## Git Workflow
- Conventional commits: feat:, fix:, refactor:, docs:, chore:, test:
- No emoji in commit messages
- Feature branches: feature/short-description
- Always run typecheck before commit

## Important Context
- Target users: Vibe coders frustrated with Lovable/Bolt credit limits
- Core value: Same AI power, no credit games, one-time price
- Philosophy: User NEVER sees terminal, everything is visual
- Quality bar: Anthropic and Apple level polish

## Automatic Skill Usage

When building VibeOS, automatically use these skills:

### Frontend Development
- Use `/frontend-design` for all UI components that need premium aesthetics
- Use `/component` command pattern for React components
- Use `/store` command pattern for Zustand stores

### Electron Development
- Use `/ipc` command pattern for IPC handlers (main + preload + types)
- Use `/manager` command pattern for main process managers

### Quality Assurance
- Invoke `code-reviewer` agent after completing features
- Invoke `security-auditor` agent before any release
- Invoke `qa-engineer` agent for edge case testing
- Invoke `product-manager` agent to validate UX decisions
- Invoke `frontend-architect` agent for architecture reviews

### Documentation Lookup
- Use Context7 MCP to fetch latest docs for: Electron, React 19, Tailwind, Zustand, node-pty, Radix UI

## Component Patterns

### UI Component Template
```tsx
import { type FC } from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const Component: FC<ComponentProps> = ({ className, children }) => {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
};
```

### Store Template
```tsx
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StoreState {
  // state
  data: DataType[];
  isLoading: boolean;
  error: string | null;

  // actions
  fetch: () => Promise<void>;
  reset: () => void;
}

export const useStore = create<StoreState>()(
  devtools(
    (set) => ({
      data: [],
      isLoading: false,
      error: null,

      fetch: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await window.api.getData();
          set({ data, isLoading: false });
        } catch (e) {
          set({ error: (e as Error).message, isLoading: false });
        }
      },

      reset: () => set({ data: [], isLoading: false, error: null }),
    }),
    { name: 'StoreName' }
  )
);
```

## IPC Pattern

### Main Process (src/main/ipc-handlers.ts)
```typescript
ipcMain.handle('channel:action', async (_event, args: ArgsType): Promise<ResultType> => {
  // 1. Validate args
  // 2. Perform operation
  // 3. Return typed result
});
```

### Preload (src/preload/index.ts)
```typescript
contextBridge.exposeInMainWorld('api', {
  channel: {
    action: (args: ArgsType): Promise<ResultType> =>
      ipcRenderer.invoke('channel:action', args),
  },
});
```

### Renderer Usage
```typescript
const result = await window.api.channel.action(args);
```

---

## User Context (Important)

**Experience Level**: First-time desktop app developer. Has only built basic, lightweight web apps before.

**Guidance Approach**:
- Explain every step clearly - don't assume prior knowledge
- Evaluate all user ideas honestly - prioritize correctness over agreement
- Proactively catch potential errors and bugs before they happen
- Always provide the optimal approach, not just a working one
- Use Claude Code's full capabilities: skills, agents, hooks, extended thinking when beneficial

**Communication Style**:
- Be direct and truthful, even if it means disagreeing
- Explain the "why" behind decisions
- Flag potential issues before they become problems
