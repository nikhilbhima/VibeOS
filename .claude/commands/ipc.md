---
description: Create a complete IPC handler (main + preload + types)
allowed-tools: Read, Write, Edit
---

Create IPC handler for: $ARGUMENTS

Create all three parts:

1. **Main Process Handler** (src/main/ipc-handlers.ts)
```typescript
ipcMain.handle('channel-name', async (event, args: ArgType): Promise<ReturnType> => {
  // Validate args
  // Perform operation
  // Return result
});
```

2. **Preload Bridge** (src/preload/index.ts)
```typescript
channelName: (args: ArgType): Promise<ReturnType> =>
  ipcRenderer.invoke('channel-name', args),
```

3. **Type Definitions** (src/shared/types/)
```typescript
export interface ArgType { /* ... */ }
export interface ReturnType { /* ... */ }
```

Security requirements:
- Validate all arguments
- Sanitize file paths
- Handle errors gracefully
- Return typed responses
