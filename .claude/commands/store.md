---
description: Create a Zustand store with proper patterns
allowed-tools: Read, Write, Edit
---

Create Zustand store for: $ARGUMENTS

Follow this pattern:
```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface EntityState {
  // Data
  items: Item[];
  selectedId: string | null;

  // UI State
  isLoading: boolean;
  error: string | null;

  // Actions
  fetch: () => Promise<void>;
  create: (item: CreateItemInput) => Promise<Item>;
  update: (id: string, updates: Partial<Item>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  select: (id: string | null) => void;
  clearError: () => void;
}

export const useEntityStore = create<EntityState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        selectedId: null,
        isLoading: false,
        error: null,

        fetch: async () => {
          set({ isLoading: true, error: null });
          try {
            const items = await window.api.entity.list();
            set({ items, isLoading: false });
          } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
          }
        },
        // ... other actions
      }),
      { name: 'entity-store' }
    ),
    { name: 'EntityStore' }
  )
);
```

Requirements:
- TypeScript interface for state
- Loading and error states
- Async actions with try/catch
- DevTools integration for debugging
- Persist middleware if needed
