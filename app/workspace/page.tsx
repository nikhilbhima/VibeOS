"use client";

import { useState } from "react";
import { Plus, Search, LayoutGrid, List } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ToolIcon } from "@/components/ToolIcons";

// Mock data for demonstration
const mockProjects = [
  {
    id: 1,
    name: "E-commerce Platform",
    description: "Full-stack online store with payment integration",
    mode: "Blueprint",
    toolUsed: "Lovable",
    progress: 75,
    phases: "7/10",
    createdAt: "Jan 10, 2025",
  },
  {
    id: 2,
    name: "Task Management App",
    description: "Collaborative todo app with real-time sync",
    mode: "Specs",
    toolUsed: "V0 (Vercel)",
    progress: 40,
    phases: "4/10",
    createdAt: "Jan 8, 2025",
  },
  {
    id: 3,
    name: "Portfolio Website",
    description: "Personal portfolio with blog and project showcase",
    mode: "Brainstorm",
    toolUsed: "Bolt",
    progress: 100,
    phases: "10/10",
    createdAt: "Jan 5, 2025",
  },
];

export default function WorkspacePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 bg-background">
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold">Workspace</h1>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 gap-1.5 flex items-center justify-center">
              <Plus className="w-4 h-4" />
              New project
            </Button>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center gap-3 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "grid"
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50"
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "list"
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50"
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative text-sm">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 bg-transparent border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer hover:bg-accent transition-colors"
              >
                <span>
                  {sortBy === "recent" && "Recent activity"}
                  {sortBy === "edited" && "Last edited"}
                  {sortBy === "created" && "Date created"}
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showSortDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSortDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-[160px] bg-card border border-border rounded-xl shadow-lg py-2 z-20">
                    <button
                      onClick={() => {
                        setSortBy("recent");
                        setShowSortDropdown(false);
                      }}
                      className="w-full flex items-center justify-between gap-2 px-4 py-3 text-sm hover:bg-accent transition-colors text-left"
                    >
                      <span>Recent activity</span>
                      {sortBy === "recent" && (
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("edited");
                        setShowSortDropdown(false);
                      }}
                      className="w-full flex items-center justify-between gap-2 px-4 py-3 text-sm hover:bg-accent transition-colors text-left"
                    >
                      <span>Last edited</span>
                      {sortBy === "edited" && (
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("created");
                        setShowSortDropdown(false);
                      }}
                      className="w-full flex items-center justify-between gap-2 px-4 py-3 text-sm hover:bg-accent transition-colors text-left"
                    >
                      <span>Date created</span>
                      {sortBy === "created" && (
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "grid grid-cols-1 gap-4"}>
            {mockProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => router.push(`/workspace/${project.id}`)}
                className={`group border border-border rounded-lg hover:border-foreground/20 hover:shadow-sm transition-all cursor-pointer bg-card ${
                  viewMode === "grid" ? "p-5 flex flex-col" : "p-5"
                }`}
              >
                {viewMode === "grid" ? (
                  // Grid View - Vertical Layout
                  <>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-2 truncate">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Mode, Tool, and Phases */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">Mode:</span>
                          <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                            {project.mode}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">Tool:</span>
                          <div className="flex items-center gap-1.5">
                            <ToolIcon toolName={project.toolUsed} className="w-3.5 h-3.5" />
                            <span className="font-medium">{project.toolUsed}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">Phases:</span>
                          <span className="font-medium">{project.phases}</span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-accent/30 rounded-full h-1.5">
                          <div
                            className="bg-foreground h-1.5 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        Updated {project.createdAt}
                      </span>
                    </div>
                  </>
                ) : (
                  // List View - Horizontal Layout
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base mb-1.5 truncate">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>Updated {project.createdAt}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
