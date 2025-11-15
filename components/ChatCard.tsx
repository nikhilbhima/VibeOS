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
  const [vibeModel] = useState("VibeOS");

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
              <DropdownMenuItem>VibeOS</DropdownMenuItem>
              <DropdownMenuItem>
                <span>VibeOS </span>
                <span className="text-[#c9a574] font-semibold">Pro</span>
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
          className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 p-0 flex items-center justify-center"
        >
          <Send className="w-5 h-5 text-primary-foreground" />
        </Button>
      </div>
    </div>
  );
}
