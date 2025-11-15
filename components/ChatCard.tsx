"use client";

import { useState } from "react";
import { Paperclip, Send, Sparkles, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatCardProps {
  selectedMode: string;
  selectedTool: string;
  onToolChange: (tool: string) => void;
  message: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
}

const tools = [
  "Anything",
  "Replit",
  "Bolt",
  "Lovable",
  "Claude Code",
  "v0",
  "Cursor",
  "Windsurf",
];

export function ChatCard({
  selectedMode,
  selectedTool,
  onToolChange,
  message,
  onMessageChange,
  onSend,
}: ChatCardProps) {
  const [vibeModel, setVibeModel] = useState("VibeOS Pro");
  const [showConnectModal, setShowConnectModal] = useState(false);

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
          {/* Mode Indicator - Top Right */}
          <div className="absolute top-3 right-3 z-10">
            <span className="px-3 py-1 bg-background rounded-lg text-xs font-medium text-foreground border border-border">
              {selectedMode}
            </span>
          </div>

          {/* Paperclip Icon */}
          <div className="absolute top-4 left-4 z-10">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </div>

          {/* Textarea */}
          <Textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Drop the idea here..."
            className="min-h-[120px] pl-12 pr-20 pt-4 pb-4 resize-none border-none focus-visible:ring-0 text-base bg-transparent"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-4 pb-4 pt-2 bg-background/50 flex items-center justify-between gap-3">
        {/* Left: Dropdowns */}
        <div className="flex items-center gap-2">
          {/* VibeOS Model Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 px-3 rounded-lg bg-background border-border text-sm font-medium"
              >
                {vibeModel}
                <ChevronDown className="w-4 h-4 ml-2" />
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
                className="h-9 px-3 rounded-lg bg-background border-border text-sm font-medium"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Tool used
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {tools.map((tool) => (
                <DropdownMenuItem
                  key={tool}
                  onClick={() => onToolChange(tool)}
                  className={selectedTool === tool ? "bg-accent" : ""}
                >
                  {tool}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: Send Button */}
        <Button
          onClick={onSend}
          disabled={!message.trim()}
          className="h-9 px-4 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Connect AI Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowConnectModal(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Connect your AI</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Connect your own AI models by providing your API keys below.
            </p>

            <div className="space-y-4">
              {/* OpenAI */}
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-2">
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  placeholder="sk-..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Anthropic */}
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-2">
                  Anthropic API Key
                </label>
                <input
                  type="password"
                  placeholder="sk-ant-..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Google */}
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-2">
                  Google AI API Key
                </label>
                <input
                  type="password"
                  placeholder="AIza..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setShowConnectModal(false)}
                variant="outline"
                className="flex-1 h-10 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Save API keys
                  setShowConnectModal(false);
                }}
                className="flex-1 h-10 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Connect
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
