"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Home, Folder, Layers, User, ChevronDown, Check } from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const mockWorkspaces = [
  { id: 1, name: "Personal Projects", icon: "P", color: "bg-blue-500/20 border border-blue-500/50", textColor: "text-blue-600 dark:text-blue-400" },
  { id: 2, name: "Team Workspace", icon: "T", color: "bg-purple-500/20 border border-purple-500/50", textColor: "text-purple-600 dark:text-purple-400" },
  { id: 3, name: "Client Work", icon: "C", color: "bg-green-500/20 border border-green-500/50", textColor: "text-green-600 dark:text-green-400" },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(mockWorkspaces[0]);
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/");

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

      {/* Workspace Switcher */}
      {!isCollapsed && (
        <div className="relative mb-4">
          <button
            onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors"
          >
            <div className={`w-6 h-6 rounded ${selectedWorkspace.color} flex items-center justify-center flex-shrink-0`}>
              <span className={`text-xs font-bold ${selectedWorkspace.textColor}`}>{selectedWorkspace.icon}</span>
            </div>
            <span className="flex-1 text-sm font-medium text-sidebar-foreground truncate text-left">
              {selectedWorkspace.name}
            </span>
            <ChevronDown className="w-4 h-4 text-sidebar-foreground flex-shrink-0" />
          </button>

          {/* Workspace Dropdown */}
          {showWorkspaceDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-sidebar border border-sidebar-border rounded-xl shadow-lg z-50 overflow-hidden">
              {mockWorkspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() => {
                    setSelectedWorkspace(workspace);
                    setShowWorkspaceDropdown(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 transition-colors ${
                    selectedWorkspace.id === workspace.id
                      ? "bg-sidebar-accent"
                      : "hover:bg-sidebar-accent/50"
                  }`}
                >
                  <div className={`w-6 h-6 rounded ${workspace.color} flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-xs font-bold ${workspace.textColor}`}>{workspace.icon}</span>
                  </div>
                  <span className="flex-1 text-sm text-sidebar-foreground truncate text-left">
                    {workspace.name}
                  </span>
                  {selectedWorkspace.id === workspace.id && (
                    <Check className={`w-4 h-4 flex-shrink-0 ${workspace.textColor}`} />
                  )}
                </button>
              ))}
              <div className="border-t border-sidebar-border px-3 py-2">
                <button className="w-full text-left text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  + New Workspace
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {/* Home */}
        <button
          onClick={() => router.push("/")}
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
          onClick={() => router.push("/workspace")}
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
          onClick={() => router.push("/prompt-library")}
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
