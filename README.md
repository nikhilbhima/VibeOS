# VibeOS - Claude Code GUI

**The visual interface for Claude Code.**

[![GitHub](https://img.shields.io/badge/GitHub-VibeOS--claude--code--GUI-blue?logo=github)](https://github.com/nikhilbhima/VibeOS-claude-code-GUI)

VibeOS is a premium desktop GUI that brings the power of Claude Code to vibe coders. If Anthropic built a GUI for Claude Code, this would be it.

## Vision

Lovable's simplicity + Claude Code's power + One-time pricing.

VibeOS gives you:
- A beautiful chat interface to describe what you want
- Live preview to watch your app build in real-time
- Full Claude Code power under the hood
- Your own Anthropic subscription (no credit games)
- Local files you own completely

## Features

### Core
- **Chat Interface** - Premium conversation UI with streaming responses
- **Live Preview** - Device frames (Desktop/Tablet/Mobile) with real-time updates
- **Activity Feed** - See what Claude is doing in friendly, non-technical language
- **Command Palette** - Raycast-style quick actions (Cmd+K)

### Marketplace
- **Plugins** - Supabase, Vercel, Stripe, GitHub, Figma integrations
- **AI Agents** - Code Reviewer, QA Tester, Frontend Architect, Security Auditor

### UX
- **Usage Dashboard** - Circular progress indicator with detailed stats popover
- **Glass-morphism Design** - Premium dark theme with subtle blur effects
- **Keyboard First** - Full keyboard navigation support

## Tech Stack

| Layer | Technology |
|-------|------------|
| Desktop | Electron |
| Build | Vite 6 |
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| State | Zustand |
| Icons | Custom SVG |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Design Philosophy

- **Premium Aesthetic** - Raycast/Cursor inspired design
- **User Never Sees Terminal** - Everything is visual
- **Progressive Disclosure** - Simple by default, depth available
- **Keyboard First** - Every action has a shortcut

## Project Structure

```
src/
├── renderer/
│   ├── components/
│   │   ├── chat/        # Chat interface
│   │   ├── home/        # Welcome screen
│   │   ├── layout/      # App shell, TopBar, Sidebar
│   │   ├── marketplace/ # Plugins & Agents
│   │   ├── modals/      # Command palette, Settings
│   │   ├── preview/     # Live preview panel
│   │   └── ui/          # Base components
│   ├── lib/             # Utilities
│   └── styles/          # Global CSS, animations
└── shared/              # Types, constants
```

## Status

Work in progress. Core UI components are functional with mock data.

## License

MIT
