---
paths: src/renderer/stores/**/*.ts
---

# Zustand Store Rules

## Structure
- Interface first, then create()
- Group: state, computed, actions
- Use immer for nested updates
- Keep stores flat

## Actions
- Async actions handle their own loading/error
- Use set() for state updates
- Use get() to read current state in actions
- Never mutate state directly

## Persistence
- Only persist essential data
- Exclude loading/error states
- Use versioning for migrations
- Consider storage limits

## DevTools
- Use devtools middleware in development
- Name stores for easy identification
- Action names should be descriptive
