"use client";

import { Sparkles, FileText, TrendingUp, Bug, Code, FileBox } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  selected: string;
  onSelect: (action: string) => void;
}

const actions = [
  { id: "Brainstorm", label: "Brainstorm", icon: Sparkles },
  { id: "Specs", label: "Specs", icon: FileText },
  { id: "Phases", label: "Phases", icon: TrendingUp },
  { id: "Bug Checks", label: "Bug Checks", icon: Bug },
  { id: "Prompts", label: "Prompts", icon: Code },
  { id: "Blueprint", label: "Blueprint", icon: FileBox },
];

export function QuickActions({ selected, onSelect }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {actions.map((action) => {
        const Icon = action.icon;
        const isActive = selected === action.id;

        return (
          <Button
            key={action.id}
            variant={isActive ? "default" : "outline"}
            onClick={() => onSelect(action.id)}
            className={`
              h-10 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-1.5
              ${
                isActive
                  ? "bg-foreground text-background shadow-sm hover:bg-foreground/90"
                  : "bg-card border-border hover:bg-accent hover:text-accent-foreground"
              }
            `}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{action.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
