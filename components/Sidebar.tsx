"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Folder, Layers, User, ChevronLeft, ChevronDown, Check } from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const mockWorkspaces = [
  { id: 1, name: "Personal Projects", icon: "P" },
  { id: 2, name: "Team Workspace", icon: "T" },
  { id: 3, name: "Client Work", icon: "C" },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedWorkspace, setSelectedWorkspace] = useState(mockWorkspaces[0]);
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);

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
        className={`flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity w-full ${
          isCollapsed ? "justify-center" : ""
        }`}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-accent flex-shrink-0 flex items-center justify-center">
          <span className="text-xl font-bold text-accent-foreground">V</span>
        </div>
        <div className={`flex-1 min-w-0 overflow-hidden transition-all duration-300 ${
          isCollapsed ? "opacity-0 w-0" : "opacity-100"
        }`}>
          <h1 className="text-lg font-semibold text-sidebar-foreground text-left whitespace-nowrap">
            VibeOS
          </h1>
          <p className="text-xs text-sidebar-foreground/70 leading-tight text-left whitespace-nowrap">
            The ultimate vibe-coding system
          </p>
        </div>
      </button>

      {/* Workspace Switcher */}
      {!isCollapsed && (
        <div className="relative mb-4">
          <button
            onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors"
          >
            <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">{selectedWorkspace.icon}</span>
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
                  className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-sidebar-accent transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">{workspace.icon}</span>
                  </div>
                  <span className="flex-1 text-sm text-sidebar-foreground truncate text-left">
                    {workspace.name}
                  </span>
                  {selectedWorkspace.id === workspace.id && (
                    <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  )}
                </button>
              ))}
              <div className="border-t border-sidebar-border px-3 py-2">
                <button className="w-full text-left text-sm text-blue-500 hover:text-blue-400 transition-colors">
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
