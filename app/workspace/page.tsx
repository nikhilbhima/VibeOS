"use client";

import { useState } from "react";
import { Plus, Search, Filter, Grid, List, Clock, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const mockProjects = [
  {
    id: 1,
    name: "E-commerce Platform",
    description: "Full-stack online store with payment integration",
    mode: "Blueprint",
    toolUsed: "Lovable",
    progress: 75,
    currentPhase: "Phase 3: Backend Integration",
    totalPhases: 4,
    completedPhases: 2,
    status: "in-progress",
    lastUpdated: "2 hours ago",
    createdAt: "Jan 10, 2025",
    phases: [
      { id: 1, name: "Planning & Specs", status: "completed", checks: 5, completedChecks: 5 },
      { id: 2, name: "UI/UX Design", status: "completed", checks: 8, completedChecks: 8 },
      { id: 3, name: "Backend Integration", status: "in-progress", checks: 6, completedChecks: 4 },
      { id: 4, name: "Testing & Deploy", status: "pending", checks: 4, completedChecks: 0 },
    ],
  },
  {
    id: 2,
    name: "Task Management App",
    description: "Collaborative todo app with real-time sync",
    mode: "Specs",
    toolUsed: "V0 (Vercel)",
    progress: 40,
    currentPhase: "Phase 2: Component Development",
    totalPhases: 3,
    completedPhases: 1,
    status: "in-progress",
    lastUpdated: "1 day ago",
    createdAt: "Jan 8, 2025",
    phases: [
      { id: 1, name: "Requirements Analysis", status: "completed", checks: 4, completedChecks: 4 },
      { id: 2, name: "Component Development", status: "in-progress", checks: 10, completedChecks: 3 },
      { id: 3, name: "Integration & Polish", status: "pending", checks: 5, completedChecks: 0 },
    ],
  },
  {
    id: 3,
    name: "Portfolio Website",
    description: "Personal portfolio with blog and project showcase",
    mode: "Brainstorm",
    toolUsed: "Bolt",
    progress: 100,
    currentPhase: "Completed",
    totalPhases: 3,
    completedPhases: 3,
    status: "completed",
    lastUpdated: "3 days ago",
    createdAt: "Jan 5, 2025",
    phases: [
      { id: 1, name: "Content Planning", status: "completed", checks: 3, completedChecks: 3 },
      { id: 2, name: "Design & Build", status: "completed", checks: 7, completedChecks: 7 },
      { id: 3, name: "Deployment", status: "completed", checks: 2, completedChecks: 2 },
    ],
  },
];

export default function WorkspacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "in-progress":
        return "text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "in-progress":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Workspace</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Track your projects, manage phases, and maintain context
              </p>
            </div>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "grid" ? "bg-accent" : "hover:bg-accent/50"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "list" ? "bg-accent" : "hover:bg-accent/50"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-6 border-b border-border bg-card/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-background border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Projects</p>
                <p className="text-2xl font-semibold">{mockProjects.length}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Grid className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-background border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">In Progress</p>
                <p className="text-2xl font-semibold">
                  {mockProjects.filter((p) => p.status === "in-progress").length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
          <div className="bg-background border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Completed</p>
                <p className="text-2xl font-semibold">
                  {mockProjects.filter((p) => p.status === "completed").length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>
          <div className="bg-background border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Avg. Progress</p>
                <p className="text-2xl font-semibold">
                  {Math.round(mockProjects.reduce((acc, p) => acc + p.progress, 0) / mockProjects.length)}%
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className="px-6 py-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 truncate group-hover:text-blue-500 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                  </div>
                  <div className={`flex items-center gap-1 ${getStatusColor(project.status)} flex-shrink-0 ml-2`}>
                    {getStatusIcon(project.status)}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Current Phase */}
                <div className="mb-4 p-2.5 bg-accent/50 rounded-lg">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Current Phase</p>
                  <p className="text-xs font-medium">{project.currentPhase}</p>
                </div>

                {/* Phases Summary */}
                <div className="flex items-center gap-4 mb-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-muted-foreground">
                      {project.completedPhases}/{project.totalPhases} phases
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{project.lastUpdated}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-background rounded text-[10px] font-medium border border-border">
                      {project.mode}
                    </span>
                    <span className="px-2 py-0.5 bg-background rounded text-[10px] font-medium border border-border">
                      {project.toolUsed}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{project.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  {/* Status Icon */}
                  <div className={`flex-shrink-0 ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-blue-500 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{project.currentPhase}</span>
                      <span>•</span>
                      <span>
                        {project.completedPhases}/{project.totalPhases} phases completed
                      </span>
                      <span>•</span>
                      <span>{project.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex-shrink-0 w-32">
                    <div className="text-xs text-muted-foreground mb-1.5 text-right">{project.progress}%</div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <span className="px-2 py-1 bg-background rounded text-xs font-medium border border-border">
                      {project.mode}
                    </span>
                    <span className="px-2 py-1 bg-background rounded text-xs font-medium border border-border">
                      {project.toolUsed}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
