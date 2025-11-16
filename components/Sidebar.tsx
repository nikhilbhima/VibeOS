"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Home, Folder, Layers, User } from "lucide-react";
import { useAccessGate } from "./AccessGate";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  const { hasAccess, requestAccess } = useAccessGate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col p-4 transition-all duration-300 z-50 ${
          isCollapsed
            ? "w-[80px] -translate-x-full md:translate-x-0"
            : "w-[280px] translate-x-0"
        }`}
      >
      {/* Logo and Title - Click to toggle */}
      <button
        onClick={onToggle}
        className={`flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity ${
          isCollapsed ? "justify-center" : ""
        }`}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <img
          src={!mounted || theme === 'dark' ? "/vibeos-logo-dark.svg" : "/vibeos-logo-light.svg"}
          alt="VibeOS Logo"
          className="w-8 h-8 flex-shrink-0"
        />
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-sidebar-foreground text-left whitespace-nowrap">
              VibeOS
            </h1>
            <p className="text-xs text-sidebar-foreground/70 leading-tight text-left whitespace-nowrap">
              The ultimate vibe-coding system
            </p>
          </div>
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {/* Home */}
        <button
          onClick={() => handleNavigation("/")}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
            isActive("/") && !isActive("/workspace")
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          } ${isCollapsed ? "justify-center" : ""}`}
          title="Home"
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Home</span>}
        </button>

        {/* Workspace */}
        <button
          onClick={() => handleNavigation("/workspace")}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
            isActive("/workspace")
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          } ${isCollapsed ? "justify-center" : ""}`}
          title="Workspace"
        >
          <Folder className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Workspace</span>}
        </button>

        {/* Prompt Library */}
        <button
          onClick={() => handleNavigation("/prompt-library")}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
            isActive("/prompt-library")
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          } ${isCollapsed ? "justify-center" : ""}`}
          title="Prompt Library"
        >
          <Layers className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Prompt Library</span>}
        </button>
      </nav>

      {/* User */}
      <button
        onClick={() => {
          if (!hasAccess) {
            requestAccess();
          }
        }}
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors ${
          isCollapsed ? "justify-center" : ""
        }`}
        title="User"
      >
        <User className="w-5 h-5 flex-shrink-0" />
        {!isCollapsed && <span className="font-medium">User</span>}
      </button>
    </aside>
    </>
  );
}
