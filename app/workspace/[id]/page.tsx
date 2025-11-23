"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToolIcon } from "@/components/ToolIcons";

// Mock project data - will be fetched based on ID in real app
const mockProject = {
  id: 1,
  name: "E-commerce Platform",
  description: "Full-stack online store with payment integration",
  mode: "Blueprint",
  toolUsed: "Lovable",
  phases: [
    {
      id: 1,
      name: "Brainstorm",
      status: "completed",
      brief: "Ideated core features: product catalog, cart, checkout, user auth",
    },
    {
      id: 2,
      name: "Specs",
      status: "completed",
      brief: "Defined technical requirements, API structure, database schema",
    },
    {
      id: 3,
      name: "Design",
      status: "completed",
      brief: "Created wireframes and UI mockups for all key pages",
    },
    {
      id: 4,
      name: "Development",
      status: "in-progress",
      brief: "Building frontend components and backend APIs",
    },
    {
      id: 5,
      name: "Testing",
      status: "pending",
      brief: "Not started",
    },
    {
      id: 6,
      name: "Deployment",
      status: "pending",
      brief: "Not started",
    },
    {
      id: 7,
      name: "Blueprint",
      status: "completed",
      brief: "Complete project blueprint with all documentation",
    },
  ],
  blueprint: {
    context: "Building a modern e-commerce platform for small businesses",
    outcome: "Fully functional online store with payment processing, inventory management, and customer dashboard",
    techStack: "Next.js, TypeScript, Prisma, PostgreSQL, Stripe",
  },
};

export default function ProjectDetailPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = useParams(); // Will be used when fetching real project data
  const [selectedPhase, setSelectedPhase] = useState(mockProject.phases[3]); // Current phase
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [showBlueprint, setShowBlueprint] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;

    // Context will be sent to API in production
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const contextualMessage = {
      role: "user",
      content: message,
      context: {
        project: mockProject.name,
        phase: selectedPhase.name,
        tool: mockProject.toolUsed,
        blueprint: mockProject.blueprint,
      },
    };

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");

    // Simulate AI response with context awareness
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I understand you're working on the ${selectedPhase.name} phase of ${mockProject.name} using ${mockProject.toolUsed}. Based on your project context (${mockProject.blueprint.context}), here's how I can help...`,
        },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePhaseClick = (phase: typeof mockProject.phases[0]) => {
    setSelectedPhase(phase);
    // Auto-notify user that context has switched
    setMessages((prev) => [
      ...prev,
      {
        role: "system",
        content: `Switched to ${phase.name} phase. I'm ready to help with this phase.`,
      },
    ]);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Side - Chat Interface */}
      <div className="flex-1 flex flex-col border-r border-border">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/workspace" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Workspace
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBlueprint(!showBlueprint)}
              className="gap-2"
            >
              <FileText className="w-4 h-4" />
              {showBlueprint ? "Hide" : "View"} Blueprint
            </Button>
          </div>
          <div>
            <h1 className="text-xl font-semibold mb-1">{mockProject.name}</h1>
            <p className="text-sm text-muted-foreground">{mockProject.description}</p>
          </div>
        </div>

        {/* Vertical Progress Summary - Left Edge */}
        <div className="absolute left-0 top-[140px] w-12 h-[calc(100vh-140px)] border-r border-border bg-sidebar/50">
          <div className="flex flex-col items-center py-4 gap-3">
            {mockProject.phases.slice(0, -1).map((phase, idx) => (
              <button
                key={phase.id}
                onClick={() => handlePhaseClick(phase)}
                className="group relative"
                title={`${phase.name}: ${phase.brief}`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-medium transition-all ${
                    phase.status === "completed"
                      ? "bg-foreground border-foreground text-background"
                      : phase.status === "in-progress"
                      ? "bg-accent border-foreground text-foreground"
                      : "bg-background border-border text-muted-foreground"
                  } ${selectedPhase.id === phase.id ? "ring-2 ring-ring ring-offset-2" : ""}`}
                >
                  {idx + 1}
                </div>
                {idx < mockProject.phases.length - 2 && (
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-[26px] w-0.5 h-3 ${
                      phase.status === "completed" ? "bg-foreground" : "bg-border"
                    }`}
                  />
                )}
                {/* Tooltip */}
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg w-48 text-left">
                  <div className="font-semibold">{phase.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{phase.brief}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 ml-12">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-lg font-semibold mb-2">
                  Working on: {selectedPhase.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  I have full context of your project. Ask me anything about this phase.
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : msg.role === "system" ? "justify-center" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-accent text-accent-foreground"
                        : msg.role === "system"
                        ? "bg-muted/50 text-muted-foreground text-xs italic"
                        : "bg-card text-card-foreground border border-border"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div className="flex-shrink-0 border-t border-border p-4 ml-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-3">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask about ${selectedPhase.name} phase...`}
                className="min-h-[60px] resize-none border-none focus-visible:ring-0 text-sm bg-transparent"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 rounded-md bg-accent/50">{selectedPhase.name}</span>
                  <div className="flex items-center gap-1">
                    <ToolIcon toolName={mockProject.toolUsed} className="w-3 h-3" />
                    <span>{mockProject.toolUsed}</span>
                  </div>
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  size="sm"
                  className="h-8 px-4"
                >
                  <span className="text-base">→</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Phases Panel */}
      <div className="w-[400px] flex flex-col bg-card border-l border-border">
        <div className="flex-shrink-0 border-b border-border p-4">
          <h2 className="text-lg font-semibold mb-1">Project Phases</h2>
          <p className="text-xs text-muted-foreground">Click a phase to switch context</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockProject.phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => handlePhaseClick(phase)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedPhase.id === phase.id
                  ? "border-foreground bg-accent shadow-sm"
                  : "border-border hover:border-foreground/50 hover:bg-accent/50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm">{phase.name}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    phase.status === "completed"
                      ? "bg-foreground/10 text-foreground"
                      : phase.status === "in-progress"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {phase.status === "completed" ? "Done" : phase.status === "in-progress" ? "Active" : "Pending"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{phase.brief}</p>
            </button>
          ))}
        </div>

        {/* Blueprint Quick Access */}
        <div className="flex-shrink-0 border-t border-border p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => handlePhaseClick(mockProject.phases[6])}
          >
            <FileText className="w-4 h-4" />
            View Full Blueprint
          </Button>
        </div>
      </div>

      {/* Blueprint Overlay */}
      {showBlueprint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBlueprint(false)}>
          <div className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Project Blueprint</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <button onClick={() => setShowBlueprint(false)} className="text-muted-foreground hover:text-foreground">
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Project Context</h3>
                  <p className="text-sm text-muted-foreground">{mockProject.blueprint.context}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Desired Outcome</h3>
                  <p className="text-sm text-muted-foreground">{mockProject.blueprint.outcome}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tech Stack</h3>
                  <p className="text-sm text-muted-foreground">{mockProject.blueprint.techStack}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Phases Summary</h3>
                  <div className="space-y-3">
                    {mockProject.phases.map((phase) => (
                      <div key={phase.id} className="border border-border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{phase.name}</h4>
                          <span className="text-xs text-muted-foreground capitalize">{phase.status}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{phase.brief}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
