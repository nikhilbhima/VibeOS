"use client";

import { useState } from "react";
import { Home, Grid3x3, Layers, User, ChevronLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col p-4 transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[280px]"
      }`}
    >
      {/* Logo and Title - Click to toggle */}
      <button
        onClick={onToggle}
        className={`flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity w-full ${
          isCollapsed ? "justify-center" : ""
        }`}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-accent flex-shrink-0 flex items-center justify-center">
          <span className="text-xl font-bold text-accent-foreground">V</span>
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-sidebar-foreground text-left">
              VibeOS
            </h1>
            <p className="text-xs text-sidebar-foreground/70 leading-tight text-left">
              The ultimate vibe-coding system
            </p>
          </div>
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {/* Home - Active */}
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-sidebar-accent text-sidebar-accent-foreground transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Home"
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Home</span>}
        </button>

        {/* Workspace - Coming Soon */}
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground/50 cursor-not-allowed ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Workspace (coming soon)"
        >
          <Grid3x3 className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <>
              <span className="font-medium">Workspace</span>
              <span className="ml-auto text-[10px] text-sidebar-foreground/40 whitespace-nowrap">
                (coming soon)
              </span>
            </>
          )}
        </button>

        {/* Prompt Library - Coming Soon */}
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground/50 cursor-not-allowed ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Prompt Library (coming soon)"
        >
          <Layers className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <div className="flex items-center justify-between flex-1 min-w-0">
              <span className="font-medium whitespace-nowrap">Prompt Library</span>
              <span className="text-[10px] text-sidebar-foreground/40 whitespace-nowrap ml-2">
                (coming soon)
              </span>
            </div>
          )}
        </button>
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors mb-2 ${
          isCollapsed ? "justify-center" : ""
        }`}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 flex-shrink-0" />
        ) : (
          <Moon className="w-5 h-5 flex-shrink-0" />
        )}
      </button>

      {/* User */}
      <button
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors ${
          isCollapsed ? "justify-center" : ""
        }`}
        title="User"
      >
        <User className="w-5 h-5 flex-shrink-0" />
        {!isCollapsed && <span className="font-medium">User</span>}
      </button>
    </aside>
  );
}
