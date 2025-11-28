"use client";

import { Sparkles, FileText, Palette, TrendingUp, Bug, Code, FileBox } from "lucide-react";

interface QuickActionsProps {
  selected: string;
  onSelect: (action: string) => void;
  compact?: boolean;
}

const actions = [
  { id: "Brainstorm", label: "Brainstorm", icon: Sparkles, description: "Ideate & explore" },
  { id: "Specs", label: "Specs", icon: FileText, description: "Define requirements" },
  { id: "Design", label: "Design", icon: Palette, description: "Visual planning" },
  { id: "Phases", label: "Phases", icon: TrendingUp, description: "Track progress" },
  { id: "Bug Checks", label: "Bug Checks", icon: Bug, description: "Quality assurance" },
  { id: "Prompts", label: "Prompts", icon: Code, description: "AI instructions" },
  { id: "Blueprint", label: "Blueprint", icon: FileBox, description: "Full documentation" },
];

export function QuickActions({ selected, onSelect, compact = false }: QuickActionsProps) {
  return (
    <div className={`flex flex-wrap items-center justify-center ${compact ? "gap-1.5 sm:gap-2" : "gap-2 sm:gap-2.5"}`}>
      {actions.map((action, index) => {
        const Icon = action.icon;
        const isActive = selected === action.id;

        return (
          <button
            key={action.id}
            onClick={() => onSelect(action.id)}
            className={`
              group relative flex items-center gap-1.5 sm:gap-2
              ${compact ? "h-8 px-2.5 sm:px-3" : "h-9 sm:h-10 px-3 sm:px-4"}
              rounded-full font-medium transition-all duration-200 press-effect
              ${compact ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm"}
              ${
                isActive
                  ? "bg-foreground text-background shadow-lg shadow-foreground/10"
                  : "bg-card border border-border hover:border-gold/50 hover:bg-secondary/50 text-foreground"
              }
            `}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <Icon
              className={`
                ${compact ? "w-3 h-3" : "w-3.5 h-3.5 sm:w-4 sm:h-4"}
                flex-shrink-0 transition-transform duration-200
                ${isActive ? "" : "group-hover:scale-110"}
                ${isActive ? "text-gold" : "text-muted-foreground group-hover:text-gold"}
              `}
            />
            <span className="whitespace-nowrap">{action.label}</span>

          </button>
        );
      })}
    </div>
  );
}
