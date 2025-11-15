"use client";

import { useState } from "react";
import { ArrowLeft, RotateCcw, Download, Share2, MoreVertical, CheckCircle2, Circle, PlayCircle, Calendar, MessageSquare, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Mock project data
const mockProject = {
  id: 1,
  name: "E-commerce Platform",
  description: "Full-stack online store with payment integration and inventory management",
  mode: "Blueprint",
  toolUsed: "Lovable",
  progress: 75,
  createdAt: "Jan 10, 2025",
  lastUpdated: "2 hours ago",
  status: "in-progress",
  currentPhaseId: 3,
  phases: [
    {
      id: 1,
      name: "Planning & Specs",
      description: "Define requirements, user stories, and technical specifications",
      status: "completed",
      progress: 100,
      startedAt: "Jan 10, 2025",
      completedAt: "Jan 11, 2025",
      checks: [
        { id: 1, name: "User stories documented", completed: true },
        { id: 2, name: "Database schema designed", completed: true },
        { id: 3, name: "API endpoints defined", completed: true },
        { id: 4, name: "Tech stack finalized", completed: true },
        { id: 5, name: "Timeline estimated", completed: true },
      ],
      conversations: 12,
    },
    {
      id: 2,
      name: "UI/UX Design",
      description: "Create wireframes, design system, and high-fidelity mockups",
      status: "completed",
      progress: 100,
      startedAt: "Jan 11, 2025",
      completedAt: "Jan 13, 2025",
      checks: [
        { id: 1, name: "Wireframes created", completed: true },
        { id: 2, name: "Design system established", completed: true },
        { id: 3, name: "Component library built", completed: true },
        { id: 4, name: "Responsive layouts tested", completed: true },
        { id: 5, name: "Color palette finalized", completed: true },
        { id: 6, name: "Typography defined", completed: true },
        { id: 7, name: "Icon set created", completed: true },
        { id: 8, name: "Accessibility reviewed", completed: true },
      ],
      conversations: 24,
    },
    {
      id: 3,
      name: "Backend Integration",
      description: "Implement API, database, authentication, and payment processing",
      status: "in-progress",
      progress: 67,
      startedAt: "Jan 13, 2025",
      completedAt: null,
      checks: [
        { id: 1, name: "Database setup complete", completed: true },
        { id: 2, name: "Auth system implemented", completed: true },
        { id: 3, name: "Product API endpoints", completed: true },
        { id: 4, name: "Payment gateway integration", completed: true },
        { id: 5, name: "Order management system", completed: false },
        { id: 6, name: "Email notifications", completed: false },
      ],
      conversations: 18,
    },
    {
      id: 4,
      name: "Testing & Deploy",
      description: "QA testing, bug fixes, performance optimization, and production deployment",
      status: "pending",
      progress: 0,
      startedAt: null,
      completedAt: null,
      checks: [
        { id: 1, name: "Unit tests written", completed: false },
        { id: 2, name: "Integration tests passed", completed: false },
        { id: 3, name: "Performance optimized", completed: false },
        { id: 4, name: "Production deployment", completed: false },
      ],
      conversations: 0,
    },
  ],
};

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const router = useRouter();
  const [selectedPhaseId, setSelectedPhaseId] = useState(mockProject.currentPhaseId);

  const selectedPhase = mockProject.phases.find((p) => p.id === selectedPhaseId) || mockProject.phases[0];
  const completedChecks = selectedPhase.checks.filter((c) => c.completed).length;

  const getPhaseStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getPhaseIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "in-progress":
        return <PlayCircle className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => router.push("/workspace")}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Workspace
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-semibold text-foreground truncate">{mockProject.name}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{mockProject.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button variant="outline" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Project Meta */}
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created {mockProject.createdAt}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Updated {mockProject.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-background rounded font-medium border border-border">
                {mockProject.mode}
              </span>
              <span className="px-2 py-1 bg-background rounded font-medium border border-border">
                {mockProject.toolUsed}
              </span>
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="px-6 pb-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-semibold">{mockProject.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all"
                style={{ width: `${mockProject.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Phase Timeline */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Phases</h2>
            <div className="space-y-3">
              {mockProject.phases.map((phase, index) => (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhaseId(phase.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedPhaseId === phase.id
                      ? "border-blue-500 bg-blue-500/5 shadow-sm"
                      : "border-border bg-card hover:bg-accent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Phase Number & Icon */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center ${getPhaseStatusColor(
                          phase.status
                        )}`}
                      >
                        {getPhaseIcon(phase.status)}
                      </div>
                    </div>

                    {/* Phase Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-medium text-sm">{phase.name}</h3>
                        <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                          {phase.checks.filter((c) => c.completed).length}/{phase.checks.length}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{phase.description}</p>

                      {/* Mini Progress Bar */}
                      <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                        <div
                          className="bg-blue-500 h-full rounded-full transition-all"
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>

                      {/* Phase Meta */}
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <MessageSquare className="w-3 h-3" />
                        <span>{phase.conversations} chats</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Phase Details */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Phase Details</h2>
              {selectedPhase.status === "completed" && (
                <Button variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Restart from this phase
                </Button>
              )}
            </div>

            {/* Selected Phase Info Card */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center ${getPhaseStatusColor(
                    selectedPhase.status
                  )}`}
                >
                  {getPhaseIcon(selectedPhase.status)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{selectedPhase.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{selectedPhase.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {selectedPhase.startedAt && (
                      <span>Started: {selectedPhase.startedAt}</span>
                    )}
                    {selectedPhase.completedAt && (
                      <span>Completed: {selectedPhase.completedAt}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Phase Progress</span>
                  <span className="font-medium">{selectedPhase.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all"
                    style={{ width: `${selectedPhase.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Manual Checks</p>
                  <p className="text-lg font-semibold">
                    {completedChecks}/{selectedPhase.checks.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Conversations</p>
                  <p className="text-lg font-semibold">{selectedPhase.conversations}</p>
                </div>
              </div>
            </div>

            {/* Manual Checks */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Manual Checks</h3>
                <span className="text-sm text-muted-foreground">
                  {completedChecks}/{selectedPhase.checks.length} completed
                </span>
              </div>
              <div className="space-y-2">
                {selectedPhase.checks.map((check) => (
                  <label
                    key={check.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={check.completed}
                      className="w-4 h-4 rounded border-border"
                      readOnly
                    />
                    <span className={`text-sm ${check.completed ? "line-through text-muted-foreground" : ""}`}>
                      {check.name}
                    </span>
                    {check.completed && (
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                    )}
                  </label>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                <Button className="flex-1 gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Continue Chat
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <FileText className="w-4 h-4" />
                  View Transcript
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
