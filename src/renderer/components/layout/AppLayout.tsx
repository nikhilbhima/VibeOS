import { type FC, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import Sidebar from '../sidebar/Sidebar';
import TopBar from './TopBar';

interface AppLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showTopBar?: boolean;
  className?: string;
  onOpenCommandPalette?: () => void;
  onOpenSettings?: () => void;
  onOpenMarketplace?: () => void;
}

export const AppLayout: FC<AppLayoutProps> = ({
  children,
  showSidebar = true,
  showTopBar = true,
  className,
  onOpenCommandPalette,
  onOpenSettings,
  onOpenMarketplace,
}) => {
  return (
    <div className="flex h-screen flex-col bg-bg-base overflow-hidden">
      {/* Custom titlebar */}
      <div className="h-12 flex-shrink-0 border-b border-border-subtle bg-bg-surface/50 backdrop-blur-xl overflow-visible">
        <TopBar
          onOpenCommandPalette={onOpenCommandPalette}
          onOpenSettings={onOpenSettings}
        />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar onOpenMarketplace={onOpenMarketplace} />}
        <main className={cn('flex-1 overflow-hidden', className)}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
