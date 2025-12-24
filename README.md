# VibeOS

**Plan better. Build faster.** The intelligent workspace for vibe-coding.

VibeOS is a planning and workspace management tool designed to help developers organize software projects through structured phases. It's the central hub for your vibe-coding workflow - you plan in VibeOS, then execute in your favorite AI coding tools (Lovable, Bolt, V0, etc.).

## Features

- **Phase-Based Workflow** - Organize projects through: Brainstorm → Specs → Design → Development → Testing → Deployment → Blueprint
- **Context Awareness** - Never lose track of decisions across project phases
- **Tool Tracking** - Track which AI tools you use for each phase
- **Progress Tracking** - Manual checks ensure real progress, not just code generation
- **Blueprint Documentation** - Complete project documentation with context and outcomes
- **Dark/Light Mode** - Full theme support with system preference detection
- **PWA Support** - Install as a native app on any device
- **Mobile Responsive** - Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **React**: 19
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/nikhilbhima/VibeOS.git
cd VibeOS

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Create a `.env.local` file for local development:

```env
# Set to false to disable access gate
NEXT_PUBLIC_ACCESS_REQUIRED=true

# App URL for Open Graph images
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Project Structure

```
VibeOS/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage with chat interface
│   └── workspace/          # Workspace pages
├── components/
│   ├── AccessGate.tsx      # Access control system
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── ChatCard.tsx        # Chat input component
│   ├── QuickActions.tsx    # Mode selection buttons
│   └── ui/                 # shadcn/ui components
├── lib/
│   └── utils.ts            # Utility functions
└── public/
    └── manifest.json       # PWA manifest
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Current Status

This is a **frontend-only** implementation. All data is currently mocked for demonstration purposes. Backend integration is planned for future releases.

### Implemented
- Complete UI/UX design
- Responsive layout
- Theme support
- Access gate system
- Client-side routing
- Project phases visualization

### Planned
- Database integration
- User authentication
- AI model integration
- Real-time collaboration
- Third-party integrations (Notion, Linear, Slack)

## License

Private repository.

## Links

- **Production**: [vibeos.app](https://vibeos.app)
- **GitHub**: [nikhilbhima/VibeOS](https://github.com/nikhilbhima/VibeOS)
