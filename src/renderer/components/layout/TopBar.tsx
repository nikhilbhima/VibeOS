import { type FC, useState } from 'react';
import { cn } from '../../lib/utils';

interface TopBarProps {
  projectName?: string;
  isLoading?: boolean;
}

export const TopBar: FC<TopBarProps> = ({
  projectName,
  isLoading = false,
}) => {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <div className="no-drag flex h-full items-center justify-between px-4">
      {/* Left section - Logo & Project */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
            </svg>
          </div>
          {projectName ? (
            <button className="flex items-center gap-1.5 text-sm font-medium text-text-primary hover:text-text-secondary transition-colors">
              <span>{projectName}</span>
              <svg className="h-3.5 w-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          ) : (
            <span className="text-sm font-semibold text-text-primary">VibeOS</span>
          )}
          {isLoading && (
            <span className="text-xs text-text-muted animate-pulse">Loading...</span>
          )}
        </div>
      </div>

      {/* Center section - Tabs (only show when in project) */}
      {projectName && (
        <div className="flex items-center gap-1 bg-bg-elevated rounded-lg p-1">
          {['Preview', 'Code', 'Changes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150',
                activeTab === tab.toLowerCase()
                  ? 'bg-bg-surface text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Right section - Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-text-muted bg-bg-elevated hover:bg-bg-hover rounded-lg transition-colors">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-bg-surface rounded border border-border-subtle">⌘K</kbd>
        </button>

        {/* Model Selector */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-secondary bg-bg-elevated hover:bg-bg-hover rounded-lg transition-colors">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span>Sonnet</span>
          <svg className="h-3 w-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Settings */}
        <button className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-hover rounded-lg transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* User Avatar */}
        <button className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-medium text-white">
          N
        </button>
      </div>
    </div>
  );
};

export default TopBar;
