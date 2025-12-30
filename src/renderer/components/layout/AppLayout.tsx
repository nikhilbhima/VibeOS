import { type FC, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import Sidebar from '../sidebar/Sidebar';
import TopBar from './TopBar';

interface AppLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showTopBar?: boolean;
  className?: string;
}

export const AppLayout: FC<AppLayoutProps> = ({
  children,
  showSidebar = true,
  showTopBar = true,
  className,
}) => {
  return (
    <div className="flex h-screen flex-col bg-bg-base overflow-hidden">
      {/* Custom titlebar drag region */}
      <div className="drag-region h-12 flex-shrink-0 border-b border-border-subtle bg-bg-surface/50 backdrop-blur-xl">
        <TopBar />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar />}
        <main className={cn('flex-1 overflow-hidden', className)}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
