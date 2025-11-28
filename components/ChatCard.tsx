"use client";

import { useState } from "react";
import { Paperclip, ChevronDown, SquarePen, ArrowUp, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToolIcon } from "@/components/ToolIcons";
import { useAccessGate } from "./AccessGate";

interface ChatCardProps {
  selectedMode: string;
  selectedTool: string;
  onToolChange: (tool: string) => void;
  message: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
  onNewChat?: () => void;
  hasMessages?: boolean;
}

const tools = [
  "None",
  "Anything",
  "Base44",
  "Bolt",
  "Claude Code",
  "Emergent Labs",
  "Firebase Studio",
  "Google AI Studio",
  "Lovable",
  "Replit",
  "Rocket",
  "V0 (Vercel)",
];

export function ChatCard({
  selectedMode,
  selectedTool,
  onToolChange,
  message,
  onMessageChange,
  onSend,
  onNewChat,
  hasMessages = false,
}: ChatCardProps) {
  const { hasAccess, requestAccess } = useAccessGate();
  const [vibeModel, setVibeModel] = useState("VibeOS Pro");
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!hasAccess) {
        requestAccess();
        return;
      }
      onSend();
    }
  };

  const handleSend = () => {
    if (!hasAccess) {
      requestAccess();
      return;
    }
    onSend();
  };

  return (
    <>
    <div className="w-full max-w-[900px] bg-card border border-border rounded-2xl shadow-xl shadow-foreground/[0.03] card-hover relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.02] via-transparent to-transparent pointer-events-none" />

      {/* Input Area */}
      <div className="p-4 sm:p-5 relative">
        <div className="relative">
          {/* Mode Indicator and New Chat - Top Right */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 flex items-center gap-2">
            {hasMessages && onNewChat && (
              <button
                onClick={() => setShowNewChatModal(true)}
                className="p-1.5 sm:p-2 bg-secondary/80 backdrop-blur-sm rounded-lg text-foreground border border-border/50 hover:border-gold/50 hover:bg-secondary transition-all press-effect"
                title="New chat"
              >
                <SquarePen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-secondary/80 backdrop-blur-sm rounded-lg text-[10px] sm:text-xs font-medium text-foreground border border-border/50 whitespace-nowrap flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-gold" />
              {selectedMode}
            </span>
          </div>

          {/* Paperclip Icon */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
            <button className="p-1 hover:bg-secondary rounded-md transition-colors">
              <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          </div>

          {/* Textarea */}
          <Textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What would you like to plan today?"
            autoFocus
            className="min-h-[56px] max-h-[120px] pl-11 sm:pl-14 pr-20 sm:pr-28 pt-3 sm:pt-4 pb-3 sm:pb-4 resize-none border-none focus-visible:ring-0 text-sm sm:text-base bg-transparent placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 flex items-center justify-between gap-3">
        {/* Left: Dropdowns */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* VibeOS Model Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 px-3 rounded-lg bg-secondary/50 border-border/50 hover:border-gold/50 hover:bg-secondary text-xs sm:text-sm font-medium min-w-0 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
              >
                <span className="truncate whitespace-nowrap flex items-center gap-1.5">
                  {vibeModel === "VibeOS Pro" ? (
                    <>
                      <span className="text-foreground">VibeOS</span>
                      <span className="text-gold font-semibold">Pro</span>
                    </>
                  ) : (
                    vibeModel
                  )}
                </span>
                <ChevronDown className="w-3.5 h-3.5 ml-1.5 flex-shrink-0 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side={hasMessages ? "top" : "bottom"} className="min-w-[160px]">
              <DropdownMenuItem onClick={() => setVibeModel("VibeOS")} className="text-sm">
                VibeOS
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVibeModel("VibeOS Pro")} className="text-sm">
                <span>VibeOS </span>
                <span className="text-gold font-semibold">Pro</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowConnectModal(true)} className="text-sm text-muted-foreground">
                Connect your AI
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tool Used Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 px-3 rounded-lg bg-secondary/50 border-border/50 hover:border-gold/50 hover:bg-secondary text-xs font-medium min-w-0 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
              >
                <span className="truncate whitespace-nowrap flex items-center gap-1.5">
                  {selectedTool !== "Anything" && selectedTool !== "None" ? (
                    <>
                      <ToolIcon toolName={selectedTool} className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="hidden sm:inline">{selectedTool}</span>
                    </>
                  ) : selectedTool === "Anything" ? (
                    <>
                      <ToolIcon toolName="Anything" className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="hidden sm:inline">Anything</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">Select tool</span>
                  )}
                </span>
                <ChevronDown className="w-3.5 h-3.5 ml-1.5 flex-shrink-0 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side={hasMessages ? "top" : "bottom"} className="w-52 max-h-[300px] overflow-y-auto">
              {tools.map((tool) => (
                <DropdownMenuItem
                  key={tool}
                  onClick={() => onToolChange(tool)}
                  className={`text-sm ${selectedTool === tool ? "bg-secondary" : ""}`}
                >
                  <div className="flex items-center gap-2.5">
                    {tool !== "None" && <ToolIcon toolName={tool} className="w-4 h-4" />}
                    <span>{tool}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: Send Button */}
        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`
            h-10 w-10 sm:h-10 sm:w-auto sm:px-5 rounded-xl flex items-center justify-center gap-2 flex-shrink-0 transition-all press-effect
            ${message.trim()
              ? "bg-gold hover:bg-gold/90 text-foreground shadow-lg shadow-gold/20"
              : "bg-secondary text-muted-foreground"
            }
          `}
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline font-medium">Send</span>
        </Button>
      </div>

    </div>

      {/* Connect AI Modal - Rendered outside ChatCard container */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[60] animate-fade-in p-4" onClick={() => setShowConnectModal(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground mb-2 font-[family-name:var(--font-display)]">Connect your AI</h2>
            <p className="text-sm text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Use any supported provider. Your key is stored only in this browser and sent with requests to VibeOS. You can remove it any time.
            </p>

            <div className="space-y-5">
              {/* Provider Dropdown */}
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-2">
                  Provider
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold appearance-none cursor-pointer transition-all"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '18px',
                    paddingRight: '40px'
                  }}
                >
                  <option value="" disabled>Select a provider</option>
                  <option value="Anthropic">Anthropic</option>
                  <option value="DeepSeek">DeepSeek</option>
                  <option value="Gemini">Gemini</option>
                  <option value="Grok">Grok</option>
                  <option value="OpenAI">OpenAI</option>
                </select>
              </div>

              {/* API Key Input */}
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-2">
                  API key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold transition-all placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 sm:mt-8">
              <Button
                onClick={() => {
                  setShowConnectModal(false);
                  setApiKey("");
                }}
                variant="outline"
                className="flex-1 h-11 rounded-xl text-sm font-medium"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Saving API key for", selectedProvider);
                  setShowConnectModal(false);
                  setApiKey("");
                }}
                className="flex-1 h-11 rounded-xl bg-foreground hover:bg-foreground/90 text-background text-sm font-medium"
              >
                Save
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-5 text-center">
              Supported: Anthropic, DeepSeek, Gemini, Grok, OpenAI
            </p>
          </div>
        </div>
      )}

      {/* New Chat Confirmation Modal - Rendered outside ChatCard container */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[60] animate-fade-in p-4" onClick={() => setShowNewChatModal(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg sm:text-xl font-semibold text-card-foreground mb-2 font-[family-name:var(--font-display)]">Start new chat?</h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Your current conversation will be lost. This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowNewChatModal(false)}
                variant="outline"
                className="flex-1 h-10 rounded-xl text-sm font-medium"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowNewChatModal(false);
                  onNewChat?.();
                }}
                className="flex-1 h-10 rounded-xl bg-foreground hover:bg-foreground/90 text-background font-medium text-sm"
              >
                Start New Chat
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
