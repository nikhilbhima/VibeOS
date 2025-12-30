---
description: Create an Electron main process manager class
allowed-tools: Read, Write, Edit
---

Create manager for: $ARGUMENTS

Follow this pattern:
```typescript
import { EventEmitter } from 'events';
import { app } from 'electron';

interface ManagerEvents {
  'ready': () => void;
  'error': (error: Error) => void;
  'data': (data: DataType) => void;
}

export class FeatureManager extends EventEmitter {
  private instance: SomeType | null = null;

  constructor() {
    super();
  }

  async initialize(): Promise<void> {
    // Setup logic
  }

  async start(): Promise<void> {
    // Start logic
  }

  async stop(): Promise<void> {
    // Cleanup logic
  }

  async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }

  // Type-safe event emitter
  on<K extends keyof ManagerEvents>(
    event: K,
    listener: ManagerEvents[K]
  ): this {
    return super.on(event, listener);
  }

  emit<K extends keyof ManagerEvents>(
    event: K,
    ...args: Parameters<ManagerEvents[K]>
  ): boolean {
    return super.emit(event, ...args);
  }
}

// Singleton export
export const featureManager = new FeatureManager();
```

Requirements:
- EventEmitter for async communication
- Proper lifecycle methods (init, start, stop, restart)
- Type-safe event handling
- Singleton pattern for managers
- Error handling at all async boundaries
