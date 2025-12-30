---
paths: src/renderer/components/**/*.tsx
---

# React Component Rules

## Structure
- One component per file
- Props interface at top
- Hooks before render logic
- Early returns for loading/error states

## Styling
- Use cn() for conditional classes
- Use design tokens from CSS variables
- Never use inline styles except dynamic values
- Group Tailwind classes logically

## Accessibility
- All interactive elements must be keyboard accessible
- Include aria-label for icon-only buttons
- Use semantic HTML (button, nav, main, etc.)
- Manage focus for modals and dialogs

## Performance
- Use React.memo for expensive pure components
- useMemo for expensive computations
- useCallback for handlers passed to children
- Never create objects/arrays in render

## State
- Prefer controlled components
- Lift state to nearest common ancestor
- Use Zustand for cross-component state
- Local state for UI-only concerns
