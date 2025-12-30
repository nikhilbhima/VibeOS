// Type definitions for the Electron API exposed via preload

export interface ElectronAPI {
  platform: NodeJS.Platform;

  app: {
    getVersion: () => Promise<string>;
    quit: () => void;
  };

  window: {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
  };

  claude: {
    send: (message: string) => Promise<void>;
    cancel: () => void;
    onStream: (callback: (chunk: string) => void) => () => void;
    onComplete: (callback: (result: unknown) => void) => () => void;
    onError: (callback: (error: string) => void) => () => void;
  };

  project: {
    open: (path: string) => Promise<void>;
    create: (name: string, template: string) => Promise<string>;
    list: () => Promise<Project[]>;
  };
}

export interface Project {
  id: string;
  name: string;
  path: string;
  framework?: string;
  createdAt: number;
  lastOpenedAt: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface ClaudeEvent {
  type: 'assistant' | 'tool_use' | 'tool_result' | 'error' | 'system';
  content?: string;
  tool_use?: {
    name: string;
    input: Record<string, unknown>;
  };
  tool_result?: {
    output: string;
    error?: string;
  };
}

declare global {
  interface Window {
    api: ElectronAPI;
  }
}
