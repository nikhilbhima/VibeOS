"use client";

import { Sparkles, FileText, Palette, TrendingUp, Bug, Code, FileBox } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  selected: string;
  onSelect: (action: string) => void;
  compact?: boolean;
}

const actions = [
  { id: "Brainstorm", label: "Brainstorm", icon: Sparkles },
  { id: "Specs", label: "Specs", icon: FileText },
  { id: "Design", label: "Design", icon: Palette },
  { id: "Phases", label: "Phases", icon: TrendingUp },
  { id: "Bug Checks", label: "Bug Checks", icon: Bug },
  { id: "Prompts", label: "Prompts", icon: Code },
  { id: "Blueprint", label: "Blueprint", icon: FileBox },
];

export function QuickActions({ selected, onSelect, compact = false }: QuickActionsProps) {
  return (
    <div className={`flex flex-wrap items-center justify-center ${compact ? "gap-1.5 sm:gap-2" : "gap-2 sm:gap-3"}`}>
      {actions.map((action) => {
        const Icon = action.icon;
        const isActive = selected === action.id;

        return (
          <Button
            key={action.id}
            variant={isActive ? "default" : "outline"}
            onClick={() => onSelect(action.id)}
            className={`
              ${compact ? "h-7 sm:h-8 px-2 sm:px-2.5" : "h-8 sm:h-9 px-2.5 sm:px-3"}
              rounded-xl font-medium
              ${compact ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-xs"}
              transition-all flex items-center justify-center gap-1
              ${
                isActive
                  ? "bg-foreground text-background shadow-sm hover:bg-foreground/90"
                  : "bg-card border-border hover:bg-accent hover:text-accent-foreground"
              }
            `}
          >
            <Icon className={`${compact ? "w-2.5 h-2.5 sm:w-3 sm:h-3" : "w-3 h-3 sm:w-3.5 sm:h-3.5"} flex-shrink-0`} />
            <span className="whitespace-nowrap">{action.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
