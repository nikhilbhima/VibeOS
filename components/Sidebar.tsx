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
      {/* Logo and Title */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-accent flex-shrink-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-accent-foreground">V</span>
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold text-sidebar-foreground truncate">
              VibeOS
            </h1>
          </div>
        )}
      </div>

      {/* Tagline */}
      {!isCollapsed && (
        <p className="text-sm text-sidebar-foreground/70 mb-6 px-1">
          The ultimate vibe-coding system
        </p>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className={`mb-4 flex items-center justify-center w-10 h-10 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors ${
          isCollapsed ? "mx-auto" : "ml-auto"
        }`}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft
          className={`w-5 h-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
        />
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {/* Home - Active */}
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-sidebar-accent text-sidebar-accent-foreground transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Home"
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Home</span>}
        </button>

        {/* Workspace - Coming Soon */}
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/50 cursor-not-allowed ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Workspace (coming soon)"
        >
          <Grid3x3 className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <>
              <span className="font-medium">Workspace</span>
              <span className="ml-auto text-xs text-sidebar-foreground/40">
                (coming soon)
              </span>
            </>
          )}
        </button>

        {/* Prompt Library - Coming Soon */}
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/50 cursor-not-allowed ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Prompt Library (coming soon)"
        >
          <Layers className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <>
              <span className="font-medium">Prompt Library</span>
              <span className="ml-auto text-xs text-sidebar-foreground/40">
                (coming soon)
              </span>
            </>
          )}
        </button>
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors mb-2 ${
          isCollapsed ? "justify-center" : ""
        }`}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? (
          <>
            <Sun className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Light Mode</span>}
          </>
        ) : (
          <>
            <Moon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Dark Mode</span>}
          </>
        )}
      </button>

      {/* User */}
      <button
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors ${
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
