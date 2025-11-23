"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Folder, User, Plus, PanelLeft } from "lucide-react";
import { useAccessGate } from "./AccessGate";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { hasAccess, requestAccess } = useAccessGate();

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/");

  const handleNavigation = (path: string) => {
    if (!hasAccess) {
      requestAccess();
      return;
    }
    router.push(path);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50 ${
          isCollapsed
            ? "w-[68px] -translate-x-full md:translate-x-0 overflow-visible"
            : "w-[280px] translate-x-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo - Click to toggle */}
          <div className="h-[60px] flex items-center px-[18px] mb-4">
            <button
              onClick={onToggle}
              className="w-full flex items-center gap-3 text-sidebar-foreground group relative"
            >
              <div className="w-[32px] h-[32px] rounded-md flex items-center justify-center flex-shrink-0 hover:bg-sidebar-accent/10 relative">
                <PanelLeft className="w-[18px] h-[18px]" />
                {isCollapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    Toggle Sidebar
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <h1 className="text-base font-semibold text-sidebar-foreground whitespace-nowrap">
                  VibeOS
                </h1>
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-[18px] space-y-2">
            {/* New Chat */}
            <button
              onClick={() => handleNavigation("/")}
              className="w-full flex items-center gap-3 h-[44px] text-sidebar-foreground group relative"
            >
              <div className="w-[32px] h-[32px] rounded-full border-2 border-sidebar-foreground/20 flex items-center justify-center group-hover:scale-110 flex-shrink-0 bg-sidebar-accent/5 relative">
                <Plus className="w-[18px] h-[18px]" />
                {isCollapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    New Chat
                  </span>
                )}
              </div>
              {!isCollapsed && <span className="whitespace-nowrap">New Chat</span>}
            </button>

            {/* Home */}
            <button
              onClick={() => handleNavigation("/")}
              className={`w-full flex items-center gap-3 h-[32px] text-sidebar-foreground group relative rounded-md ${
                isActive("/") && !isActive("/workspace")
                  ? "bg-sidebar-accent/20"
                  : "hover:bg-sidebar-accent/10"
              }`}
            >
              <div className="w-[32px] h-[32px] flex items-center justify-center flex-shrink-0 relative">
                <Home className="w-[18px] h-[18px]" />
                {isCollapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    Home
                  </span>
                )}
              </div>
              {!isCollapsed && <span className="whitespace-nowrap">Home</span>}
            </button>

            {/* Workspace */}
            <button
              onClick={() => handleNavigation("/workspace")}
              className={`w-full flex items-center gap-3 h-[32px] text-sidebar-foreground group relative rounded-md ${
                isActive("/workspace")
                  ? "bg-sidebar-accent/20"
                  : "hover:bg-sidebar-accent/10"
              }`}
            >
              <div className="w-[32px] h-[32px] flex items-center justify-center flex-shrink-0 relative">
                <Folder className="w-[18px] h-[18px]" />
                {isCollapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    Workspace
                  </span>
                )}
              </div>
              {!isCollapsed && <span className="whitespace-nowrap">Workspace</span>}
            </button>
          </nav>

          {/* User at bottom */}
          <div className="px-[18px] pb-4">
            <button
              onClick={() => {
                if (!hasAccess) {
                  requestAccess();
                }
              }}
              className="w-full flex items-center gap-3 h-[44px] text-sidebar-foreground"
              title="User"
            >
              <div className="w-[32px] h-[32px] rounded-md flex items-center justify-center flex-shrink-0 hover:bg-sidebar-accent/10">
                <User className="w-[18px] h-[18px]" />
              </div>
              {!isCollapsed && <span className="whitespace-nowrap">User</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
