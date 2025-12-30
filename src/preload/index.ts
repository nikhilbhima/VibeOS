import { contextBridge, ipcRenderer } from 'electron';

// Type definitions for the exposed API
export interface ElectronAPI {
  // Platform info
  platform: NodeJS.Platform;

  // App info
  app: {
    getVersion: () => Promise<string>;
    quit: () => void;
  };

  // Window controls
  window: {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
  };

  // Claude Code integration (to be implemented)
  claude: {
    send: (message: string) => Promise<void>;
    cancel: () => void;
    onStream: (callback: (chunk: string) => void) => () => void;
    onComplete: (callback: (result: unknown) => void) => () => void;
    onError: (callback: (error: string) => void) => () => void;
  };

  // Project management (to be implemented)
  project: {
    open: (path: string) => Promise<void>;
    create: (name: string, template: string) => Promise<string>;
    list: () => Promise<Array<{ id: string; name: string; path: string }>>;
  };
}

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('api', {
  platform: process.platform,

  app: {
    getVersion: (): Promise<string> => ipcRenderer.invoke('app:version'),
    quit: (): void => ipcRenderer.send('app:quit'),
  },

  window: {
    minimize: (): void => ipcRenderer.send('window:minimize'),
    maximize: (): void => ipcRenderer.send('window:maximize'),
    close: (): void => ipcRenderer.send('window:close'),
  },

  claude: {
    send: (message: string): Promise<void> =>
      ipcRenderer.invoke('claude:send', message),
    cancel: (): void => ipcRenderer.send('claude:cancel'),
    onStream: (callback: (chunk: string) => void): (() => void) => {
      const handler = (_event: Electron.IpcRendererEvent, chunk: string): void =>
        callback(chunk);
      ipcRenderer.on('claude:stream', handler);
      return () => ipcRenderer.removeListener('claude:stream', handler);
    },
    onComplete: (callback: (result: unknown) => void): (() => void) => {
      const handler = (_event: Electron.IpcRendererEvent, result: unknown): void =>
        callback(result);
      ipcRenderer.on('claude:complete', handler);
      return () => ipcRenderer.removeListener('claude:complete', handler);
    },
    onError: (callback: (error: string) => void): (() => void) => {
      const handler = (_event: Electron.IpcRendererEvent, error: string): void =>
        callback(error);
      ipcRenderer.on('claude:error', handler);
      return () => ipcRenderer.removeListener('claude:error', handler);
    },
  },

  project: {
    open: (path: string): Promise<void> =>
      ipcRenderer.invoke('project:open', path),
    create: (name: string, template: string): Promise<string> =>
      ipcRenderer.invoke('project:create', { name, template }),
    list: (): Promise<Array<{ id: string; name: string; path: string }>> =>
      ipcRenderer.invoke('project:list'),
  },
} satisfies ElectronAPI);

// Type declaration for window.api
declare global {
  interface Window {
    api: ElectronAPI;
  }
}
