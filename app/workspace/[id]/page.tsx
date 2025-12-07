"use client";

import { useState } from "react";
// import { useParams } from "next/navigation"; // TODO: Enable when fetching real data
import { ArrowLeft, Download, FileText, Check, Circle, Loader2, ArrowUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToolIcon } from "@/components/ToolIcons";

// Mock project data
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
  // TODO: Use params.id to fetch real project data
  // const { id } = useParams();
  const [selectedPhase, setSelectedPhase] = useState(mockProject.phases[3]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [showBlueprint, setShowBlueprint] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");

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
    setMessages((prev) => [
      ...prev,
      {
        role: "system",
        content: `Switched to ${phase.name} phase. I'm ready to help with this phase.`,
      },
    ]);
  };

  const getStatusIcon = (status: string, isSelected: boolean) => {
    if (status === "completed") {
      return <Check className={`w-3.5 h-3.5 ${isSelected ? "text-background" : "text-green-500"}`} />;
    }
    if (status === "in-progress") {
      return <Loader2 className={`w-3.5 h-3.5 animate-spin ${isSelected ? "text-background" : "text-gold"}`} />;
    }
    return <Circle className={`w-3.5 h-3.5 ${isSelected ? "text-background" : "text-muted-foreground"}`} />;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Side - Chat Interface */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <Link
                href="/workspace"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Workspace
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBlueprint(!showBlueprint)}
                className="gap-2 border-border/50 hover:border-gold/50 hover:bg-secondary/50"
              >
                <FileText className="w-4 h-4" />
                {showBlueprint ? "Hide" : "View"} Blueprint
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-semibold mb-1 font-[family-name:var(--font-display)] truncate">
                  {mockProject.name}
                </h1>
                <p className="text-sm text-muted-foreground truncate">{mockProject.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/80 text-xs font-medium">
                  <ToolIcon toolName={mockProject.toolUsed} className="w-3.5 h-3.5" />
                  {mockProject.toolUsed}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-16 animate-fade-up">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 mb-4">
                  <Sparkles className="w-7 h-7 text-gold" />
                </div>
                <h2 className="text-xl font-semibold mb-2 font-[family-name:var(--font-display)]">
                  Working on: {selectedPhase.name}
                </h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  I have full context of your project. Ask me anything about this phase and I&apos;ll help you plan effectively.
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : msg.role === "system" ? "justify-center" : "justify-start"
                  } animate-fade-up`}
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-foreground text-background"
                        : msg.role === "system"
                        ? "bg-secondary/50 text-muted-foreground text-xs italic px-4 py-2"
                        : "bg-card text-card-foreground border border-border/50 shadow-sm"
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
        <div className="flex-shrink-0 border-t border-border/50 bg-gradient-to-t from-background to-background/80 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-lg shadow-foreground/[0.02]">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask about ${selectedPhase.name} phase...`}
                className="min-h-[60px] resize-none border-none focus-visible:ring-0 text-sm bg-transparent placeholder:text-muted-foreground/60"
              />
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2.5 py-1 rounded-lg bg-secondary/80 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-gold" />
                    {selectedPhase.name}
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/80">
                    <ToolIcon toolName={mockProject.toolUsed} className="w-3 h-3" />
                    <span className="font-medium">{mockProject.toolUsed}</span>
                  </div>
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  size="sm"
                  className={`h-9 px-4 rounded-xl transition-all press-effect ${
                    message.trim()
                      ? "bg-gold hover:bg-gold/90 text-foreground shadow-lg shadow-gold/20"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Phases Panel */}
      <div className="w-[360px] flex flex-col bg-card border-l border-border/50 flex-shrink-0">
        <div className="flex-shrink-0 border-b border-border/50 p-5">
          <h2 className="text-lg font-semibold mb-1 font-[family-name:var(--font-display)]">Project Phases</h2>
          <p className="text-xs text-muted-foreground">Click a phase to switch context</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {mockProject.phases.map((phase, index) => (
            <button
              key={phase.id}
              onClick={() => handlePhaseClick(phase)}
              className={`
                w-full text-left p-4 rounded-xl border transition-all group animate-fade-up press-effect
                ${
                  selectedPhase.id === phase.id
                    ? "border-gold bg-gold text-foreground shadow-lg shadow-gold/20"
                    : "border-border/50 hover:border-gold/30 hover:bg-secondary/50"
                }
              `}
              style={{ animationDelay: `${index * 40}ms`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center
                    ${selectedPhase.id === phase.id
                      ? "bg-foreground/20"
                      : phase.status === "completed"
                      ? "bg-green-500/10"
                      : phase.status === "in-progress"
                      ? "bg-gold/10"
                      : "bg-secondary"
                    }
                  `}>
                    {getStatusIcon(phase.status, selectedPhase.id === phase.id)}
                  </div>
                  <h3 className="font-semibold text-sm">{phase.name}</h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                    selectedPhase.id === phase.id
                      ? "bg-foreground/20 text-foreground"
                      : phase.status === "completed"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : phase.status === "in-progress"
                      ? "bg-gold/10 text-gold"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {phase.status === "completed" ? "Done" : phase.status === "in-progress" ? "Active" : "Pending"}
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${
                selectedPhase.id === phase.id ? "text-foreground/80" : "text-muted-foreground"
              }`}>
                {phase.brief}
              </p>
            </button>
          ))}
        </div>

        {/* Blueprint Quick Access */}
        <div className="flex-shrink-0 border-t border-border/50 p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 h-11 border-border/50 hover:border-gold/50 hover:bg-secondary/50"
            onClick={() => setShowBlueprint(true)}
          >
            <FileText className="w-4 h-4 text-gold" />
            View Full Blueprint
          </Button>
        </div>
      </div>

      {/* Blueprint Overlay */}
      {showBlueprint && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setShowBlueprint(false)}
        >
          <div
            className="bg-card border border-border/50 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="text-xl font-semibold font-[family-name:var(--font-display)]">Project Blueprint</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2 border-border/50 hover:border-gold/50">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <button
                  onClick={() => setShowBlueprint(false)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                  <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Context</h3>
                  <p className="text-sm leading-relaxed">{mockProject.blueprint.context}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                  <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Desired Outcome</h3>
                  <p className="text-sm leading-relaxed">{mockProject.blueprint.outcome}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                  <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Tech Stack</h3>
                  <p className="text-sm leading-relaxed font-mono">{mockProject.blueprint.techStack}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Phases Summary</h3>
                  <div className="space-y-2">
                    {mockProject.phases.map((phase) => (
                      <div key={phase.id} className="border border-border/50 rounded-xl p-4 bg-card/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`
                              w-5 h-5 rounded-full flex items-center justify-center
                              ${phase.status === "completed"
                                ? "bg-green-500/10"
                                : phase.status === "in-progress"
                                ? "bg-gold/10"
                                : "bg-secondary"
                              }
                            `}>
                              {getStatusIcon(phase.status, false)}
                            </div>
                            <h4 className="font-medium text-sm">{phase.name}</h4>
                          </div>
                          <span className={`text-xs capitalize px-2 py-0.5 rounded-md ${
                            phase.status === "completed"
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : phase.status === "in-progress"
                              ? "bg-gold/10 text-gold"
                              : "bg-secondary text-muted-foreground"
                          }`}>
                            {phase.status.replace("-", " ")}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{phase.brief}</p>
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
