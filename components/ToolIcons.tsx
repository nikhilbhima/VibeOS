// Tool icon components for the dropdown menu
// Icons reference SVG files in the "Tool dropdown Icons/Light Mode" folder
// Dark mode is handled by CSS filter inversion

interface IconProps {
  className?: string;
  toolName: string;
}

// Generic icon component that loads the appropriate SVG
export const ToolIcon = ({ className, toolName }: IconProps) => {
  // Map tool names to their SVG file names
  const iconMap: Record<string, string> = {
    "Anything": "Anything.svg",
    "Base44": "Base44.svg",
    "Bolt": "bolt.svg",
    "Claude Code": "Claude Code.svg",
    "Emergent Labs": "Emergent Labs.svg",
    "Firebase Studio": "Firebase Studio.svg",
    "Google AI Studio": "Google AI Studio.svg",
    "Lovable": "Lovable.svg",
    "Replit": "Replit.svg",
    "Rocket": "Rocket.svg",
    "V0 (Vercel)": "V0.svg",
  };

  const svgFileName = iconMap[toolName];

  if (!svgFileName) return null;

  return (
    <img
      src={`/Tool%20dropdown%20Icons/Light%20Mode/${encodeURIComponent(svgFileName)}`}
      alt={`${toolName} icon`}
      className={`${className} dark:invert`}
      style={{ width: '1rem', height: '1rem', objectFit: 'contain' }}
    />
  );
};
