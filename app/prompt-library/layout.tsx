"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export default function PromptLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border flex items-center px-4 z-30 md:hidden">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="ml-3 text-lg font-semibold">VibeOS</h1>
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 pt-16 md:pt-0 ${
          isSidebarCollapsed ? "md:ml-[80px]" : "md:ml-[280px]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
