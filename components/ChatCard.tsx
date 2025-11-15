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
  const [selectedProvider, setSelectedProvider] = useState("Anthropic");
  const [apiKey, setApiKey] = useState("");

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
                {vibeModel === "VibeOS Pro" ? (
                  <>
                    <span>VibeOS </span>
                    <span className="text-[#c9a574] font-semibold">Pro</span>
                  </>
                ) : (
                  vibeModel
                )}
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
          className="h-9 px-4 rounded-lg bg-foreground hover:bg-foreground/90 text-background flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
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
    </div>
  );
}
