"use client";

import { useState } from "react";
import { Plus, Search, LayoutGrid, List, Calendar, Layers } from "lucide-react";
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

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "bg-gold";
    if (progress >= 40) return "bg-gold/60";
    return "bg-muted-foreground";
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-4 sm:pb-6">
          {/* Title Row */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold font-[family-name:var(--font-display)] mb-1">Workspace</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Manage your projects and track progress</p>
            </div>
            <Button
              size="sm"
              className="bg-gold hover:bg-gold/90 text-foreground gap-1.5 sm:gap-2 shadow-lg shadow-gold/20 press-effect h-9 sm:h-10 px-3 sm:px-4"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium hidden sm:inline">New project</span>
            </Button>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-secondary/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all placeholder:text-muted-foreground/60"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-secondary/50 border border-border/50 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-1.5 sm:gap-2 bg-secondary/50 border border-border/50 rounded-xl px-2.5 sm:px-4 py-2 sm:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer hover:bg-secondary transition-all"
              >
                <span className="text-muted-foreground text-xs hidden sm:inline">Sort:</span>
                <span className="font-medium text-xs sm:text-sm">
                  {sortBy === "recent" && "Recent"}
                  {sortBy === "edited" && "Edited"}
                  {sortBy === "created" && "Created"}
                </span>
                <svg
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
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
                  <div className="absolute right-0 mt-2 w-[160px] bg-card border border-border rounded-xl shadow-xl py-1 z-20 animate-scale-in">
                    {[
                      { key: "recent", label: "Recent activity" },
                      { key: "edited", label: "Last edited" },
                      { key: "created", label: "Date created" },
                    ].map((option) => (
                      <button
                        key={option.key}
                        onClick={() => {
                          setSortBy(option.key);
                          setShowSortDropdown(false);
                        }}
                        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm hover:bg-secondary transition-colors text-left"
                      >
                        <span>{option.label}</span>
                        {sortBy === option.key && (
                          <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
            {mockProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => router.push(`/workspace/${project.id}`)}
                className={`
                  group border border-border/50 rounded-2xl bg-card hover:border-gold/30 transition-all cursor-pointer card-hover relative overflow-hidden animate-fade-up
                  ${viewMode === "grid" ? "p-5" : "p-5"}
                `}
                style={{ animationDelay: `${index * 50}ms`, opacity: 0, animationFillMode: 'forwards' }}
              >
                {/* Subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {viewMode === "grid" ? (
                  // Grid View
                  <div className="relative">
                    {/* Progress ring - top right */}
                    <div className="absolute -top-2 -right-2">
                      <div className="relative w-10 h-10">
                        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                          <circle
                            cx="20"
                            cy="20"
                            r="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="text-border"
                          />
                          <circle
                            cx="20"
                            cy="20"
                            r="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeDasharray={`${(project.progress / 100) * 100.5} 100.5`}
                            strokeLinecap="round"
                            className="text-gold"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold">
                          {project.progress}%
                        </span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-base mb-1.5 pr-14 font-[family-name:var(--font-display)]">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary/80 text-xs font-medium">
                        <Layers className="w-3 h-3 text-gold" />
                        {project.mode}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-secondary/80 text-xs font-medium">
                        <ToolIcon toolName={project.toolUsed} className="w-3 h-3" />
                        {project.toolUsed}
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {project.createdAt}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {project.phases} phases
                      </span>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div className="flex items-center gap-4 relative">
                    {/* Progress indicator */}
                    <div className={`w-1.5 h-12 rounded-full ${getProgressColor(project.progress)}`} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-base truncate font-[family-name:var(--font-display)]">
                          {project.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/80 text-[10px] font-medium flex-shrink-0">
                          {project.mode}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-1.5">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ToolIcon toolName={project.toolUsed} className="w-3 h-3" />
                          {project.toolUsed}
                        </span>
                        <span>{project.phases} phases</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.createdAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm font-semibold">{project.progress}%</span>
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
