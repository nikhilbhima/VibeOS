"use client";

import { useState } from "react";
import { Paperclip, Send, Sparkles, SlidersHorizontal, ChevronDown, SquarePen } from "lucide-react";
import { useTheme } from "next-themes";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToolIcon } from "@/components/ToolIcons";

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
  const { theme } = useTheme();
  const [vibeModel, setVibeModel] = useState("VibeOS Pro");
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("Anthropic");
  const [apiKey, setApiKey] = useState("");
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="w-full max-w-[900px] bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
      {/* Input Area */}
      <div className="p-4">
        <div className="relative">
          {/* Mode Indicator and New Chat - Top Right */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 flex items-center gap-1.5 sm:gap-2">
            {hasMessages && onNewChat && (
              <button
                onClick={() => setShowNewChatModal(true)}
                className="p-1 sm:p-1.5 bg-background rounded-lg text-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                title="New chat"
              >
                <SquarePen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-background rounded-lg text-[10px] sm:text-xs font-medium text-foreground border border-border whitespace-nowrap">
              {selectedMode}
            </span>
          </div>

          {/* Paperclip Icon */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
            <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          </div>

          {/* Textarea */}
          <Textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Drop the idea here..."
            className="min-h-[85px] pl-10 sm:pl-12 pr-16 sm:pr-20 pt-3 sm:pt-4 pb-3 sm:pb-4 resize-none border-none focus-visible:ring-0 text-sm sm:text-base bg-transparent"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-4 pb-4 pt-2 bg-background/50 flex items-center justify-between gap-2">
        {/* Left: Dropdowns */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {/* VibeOS Model Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 px-2 sm:px-3 rounded-lg bg-background border-border text-xs sm:text-sm font-medium min-w-0"
              >
                <span className="truncate">
                  {vibeModel === "VibeOS Pro" ? (
                    <>
                      <span className="hidden sm:inline">VibeOS </span>
                      <span className="text-[#c9a574] font-semibold">Pro</span>
                    </>
                  ) : (
                    vibeModel
                  )}
                </span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setVibeModel("VibeOS")}>
                VibeOS
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVibeModel("VibeOS Pro")}>
                <span>VibeOS </span>
                <span className="text-[#c9a574] font-semibold">Pro</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowConnectModal(true)}>
                Connect your AI
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tool Used Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-lg bg-background border-border text-[10px] sm:text-xs font-medium min-w-0"
              >
                <SlidersHorizontal className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate whitespace-nowrap">
                  Tool used{selectedTool !== "Anything" ? `: ${selectedTool}` : ""}
                </span>
                <ChevronDown className="w-3 h-3 ml-1 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom" className="w-48">
              {tools.map((tool) => (
                <DropdownMenuItem
                  key={tool}
                  onClick={() => onToolChange(tool)}
                  className={selectedTool === tool ? "bg-accent" : ""}
                >
                  <div className="flex items-center gap-2">
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
          onClick={onSend}
          disabled={!message.trim()}
          className="h-9 px-4 sm:px-6 rounded-lg bg-foreground hover:bg-foreground/90 text-background flex items-center justify-center gap-2 flex-shrink-0"
        >
          <span className="text-lg">→</span>
        </Button>
      </div>

      {/* Connect AI Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowConnectModal(false)}>
          <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-lg m-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-semibold text-card-foreground mb-2">Connect your AI</h2>
            <p className="text-sm text-muted-foreground mb-8">
              Use any supported provider. Your key is stored only in this browser and sent with requests to VibeOS. You can remove it any time.
            </p>

            <div className="space-y-6">
              {/* Provider Dropdown */}
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-3">
                  Provider
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px',
                    paddingRight: '40px'
                  }}
                >
                  <option value="Anthropic">Anthropic</option>
                  <option value="DeepSeek">DeepSeek</option>
                  <option value="Gemini">Gemini</option>
                  <option value="Grok">Grok</option>
                  <option value="OpenAI">OpenAI</option>
                </select>
              </div>

              {/* API Key Input */}
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-3">
                  API key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                onClick={() => {
                  setShowConnectModal(false);
                  setApiKey("");
                }}
                variant="outline"
                className="flex-1 h-11 rounded-lg text-base"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Save API key to localStorage
                  console.log("Saving API key for", selectedProvider);
                  setShowConnectModal(false);
                  setApiKey("");
                }}
                className="flex-1 h-11 rounded-lg bg-foreground hover:bg-foreground/90 text-background text-base font-medium"
              >
                Save
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Supported now: Anthropic, DeepSeek, Gemini, Grok, OpenAI.
            </p>
          </div>
        </div>
      )}

      {/* New Chat Confirmation Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowNewChatModal(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold text-card-foreground mb-2">Start new chat?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Your current conversation will be lost. This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowNewChatModal(false)}
                variant="outline"
                className="flex-1 h-10 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowNewChatModal(false);
                  onNewChat?.();
                }}
                className="flex-1 h-10 rounded-lg bg-foreground hover:bg-foreground/90 text-background font-medium"
              >
                Start New Chat
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
