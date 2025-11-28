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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50 transition-all duration-300 ${
          isCollapsed
            ? "w-[72px] -translate-x-full md:translate-x-0 overflow-visible"
            : "w-[260px] translate-x-0 overflow-hidden"
        }`}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col h-full relative">
          {/* Logo - Click to toggle */}
          <div className="h-[64px] flex items-center px-[18px]">
            <button
              onClick={onToggle}
              className="w-full flex items-center gap-3 text-sidebar-foreground group relative"
            >
              <div className="w-[36px] h-[36px] rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-sidebar-accent/20 transition-all relative">
                <PanelLeft className="w-[18px] h-[18px]" />
                {isCollapsed && (
                  <span className="absolute left-full ml-3 px-3 py-1.5 bg-card text-card-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-border transition-opacity">
                    Toggle Sidebar
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <h1 className="text-base font-semibold text-sidebar-foreground whitespace-nowrap font-[family-name:var(--font-display)]">
                  <span className="text-gradient-gold">Vibe</span>
                  <span>OS</span>
                </h1>
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1 mt-2">
            {/* New Chat */}
            <button
              onClick={() => handleNavigation("/")}
              className={`w-full flex items-center gap-3 h-[44px] px-3 text-sidebar-foreground group relative rounded-xl hover:bg-sidebar-accent/10 transition-all ${isCollapsed ? "justify-center" : ""}`}
            >
              <div className="w-[32px] h-[32px] rounded-full border-2 border-gold/30 bg-gold/5 flex items-center justify-center group-hover:scale-105 group-hover:border-gold/50 flex-shrink-0 transition-all relative">
                <Plus className="w-[16px] h-[16px] text-gold" />
                {isCollapsed && (
                  <span className="absolute left-full ml-3 px-3 py-1.5 bg-card text-card-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-border transition-opacity">
                    New Chat
                  </span>
                )}
              </div>
              {!isCollapsed && <span className="whitespace-nowrap text-sm font-medium">New Chat</span>}
            </button>

            {/* Divider */}
            <div className="h-px bg-sidebar-border/50 my-3 mx-3" />

            {/* Home */}
            <button
              onClick={() => handleNavigation("/")}
              className={`w-full flex items-center gap-3 h-[44px] px-3 text-sidebar-foreground group relative rounded-xl transition-all ${
                isActive("/") && !isActive("/workspace")
                  ? "bg-sidebar-accent/20 text-sidebar-foreground"
                  : "hover:bg-sidebar-accent/10"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <div className="w-[32px] h-[32px] flex items-center justify-center flex-shrink-0 relative">
                <Home className={`w-[18px] h-[18px] ${isActive("/") && !isActive("/workspace") ? "text-gold" : ""}`} />
                {isCollapsed && (
                  <span className="absolute left-full ml-3 px-3 py-1.5 bg-card text-card-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-border transition-opacity">
                    Home
                  </span>
                )}
              </div>
              {!isCollapsed && <span className="whitespace-nowrap text-sm">Home</span>}
            </button>

            {/* Workspace */}
            <button
              onClick={() => handleNavigation("/workspace")}
              className={`w-full flex items-center gap-3 h-[44px] px-3 text-sidebar-foreground group relative rounded-xl transition-all ${
                isActive("/workspace")
                  ? "bg-sidebar-accent/20 text-sidebar-foreground"
                  : "hover:bg-sidebar-accent/10"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <div className="w-[32px] h-[32px] flex items-center justify-center flex-shrink-0 relative">
                <Folder className={`w-[18px] h-[18px] ${isActive("/workspace") ? "text-gold" : ""}`} />
                {isCollapsed && (
                  <span className="absolute left-full ml-3 px-3 py-1.5 bg-card text-card-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-border transition-opacity">
                    Workspace
                  </span>
                )}
              </div>
              {!isCollapsed && <span className="whitespace-nowrap text-sm">Workspace</span>}
            </button>
          </nav>

          {/* User at bottom */}
          <div className="px-3 pb-4">
            <button
              onClick={() => {
                if (!hasAccess) {
                  requestAccess();
                }
              }}
              className="w-full flex items-center gap-3 h-[44px] px-3 text-sidebar-foreground group rounded-xl hover:bg-sidebar-accent/10 transition-all"
              title="User"
            >
              <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center flex-shrink-0 relative">
                <User className="w-[16px] h-[16px] text-gold" />
                {isCollapsed && (
                  <span className="absolute left-full ml-3 px-3 py-1.5 bg-card text-card-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-border transition-opacity">
                    Account
                  </span>
                )}
              </div>
              {!isCollapsed && <span className="whitespace-nowrap text-sm">Account</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
