---
description: Create a new React component following VibeOS patterns
allowed-tools: Read, Write, Edit
---

Create a React component at: $ARGUMENTS

Follow these requirements:
1. Read CLAUDE.md for design system tokens
2. Use TypeScript with explicit Props interface
3. Functional component with proper typing
4. Tailwind CSS for all styling
5. Include loading and error states if async
6. Add proper ARIA labels
7. Export as default

Template:
```tsx
import { type FC } from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  className?: string;
}

export const ComponentName: FC<ComponentNameProps> = ({ className }) => {
  return (
    <div className={cn('', className)}>
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```
