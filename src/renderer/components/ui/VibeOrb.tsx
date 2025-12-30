import { type FC } from 'react';
import { cn } from '../../lib/utils';

type OrbState = 'idle' | 'thinking' | 'building' | 'success' | 'error';

interface VibeOrbProps {
  state?: OrbState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showAmbient?: boolean;
}

/**
 * VibeOrb - The Living Heart of VibeOS
 *
 * A distinctive visual element that represents Claude's state.
 * - Idle: Gentle amber glow, slow breathing animation
 * - Thinking: Purple hue, organic pulsing motion
 * - Building: Emerald color, energetic pulse
 * - Success: Bright green flash
 * - Error: Red warning pulse
 *
 * Design: Creates ambient lighting effect on the interface
 */
export const VibeOrb: FC<VibeOrbProps> = ({
  state = 'idle',
  size = 'md',
  className,
  showAmbient = true,
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32',
  };

  const ambientSizes = {
    sm: 'h-24 w-24',
    md: 'h-48 w-48',
    lg: 'h-64 w-64',
    xl: 'h-80 w-80',
  };

  const stateConfig = {
    idle: {
      gradient: 'from-[hsl(24,80%,55%)] via-[hsl(30,90%,50%)] to-[hsl(20,70%,45%)]',
      glow: 'shadow-[0_0_60px_20px_hsl(24_80%_50%/0.2),0_0_120px_40px_hsl(24_80%_50%/0.1)]',
      animation: 'animate-orb-breathe',
      ambientColor: 'bg-[hsl(24,80%,50%)]',
    },
    thinking: {
      gradient: 'from-[hsl(260,70%,65%)] via-[hsl(280,60%,55%)] to-[hsl(240,60%,50%)]',
      glow: 'shadow-[0_0_60px_20px_hsl(260_70%_60%/0.25),0_0_120px_40px_hsl(260_70%_60%/0.12)]',
      animation: 'animate-orb-thinking',
      ambientColor: 'bg-[hsl(260,70%,60%)]',
    },
    building: {
      gradient: 'from-[hsl(160,70%,50%)] via-[hsl(150,80%,45%)] to-[hsl(170,60%,40%)]',
      glow: 'shadow-[0_0_60px_20px_hsl(160_70%_50%/0.25),0_0_120px_40px_hsl(160_70%_50%/0.12)]',
      animation: 'animate-orb-building',
      ambientColor: 'bg-[hsl(160,70%,50%)]',
    },
    success: {
      gradient: 'from-[hsl(155,75%,50%)] via-[hsl(145,80%,45%)] to-[hsl(165,70%,40%)]',
      glow: 'shadow-[0_0_80px_30px_hsl(155_75%_50%/0.3),0_0_150px_50px_hsl(155_75%_50%/0.15)]',
      animation: 'animate-pulse',
      ambientColor: 'bg-[hsl(155,75%,50%)]',
    },
    error: {
      gradient: 'from-[hsl(0,75%,55%)] via-[hsl(10,80%,50%)] to-[hsl(350,70%,45%)]',
      glow: 'shadow-[0_0_60px_20px_hsl(0_75%_55%/0.3),0_0_120px_40px_hsl(0_75%_55%/0.15)]',
      animation: 'animate-pulse',
      ambientColor: 'bg-[hsl(0,75%,55%)]',
    },
  };

  const config = stateConfig[state];

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      {/* Ambient glow background */}
      {showAmbient && (
        <div
          className={cn(
            'absolute rounded-full blur-[80px] opacity-20',
            'animate-ambient-float',
            ambientSizes[size],
            config.ambientColor
          )}
        />
      )}

      {/* Secondary ambient layer */}
      {showAmbient && (
        <div
          className={cn(
            'absolute rounded-full blur-[60px] opacity-15',
            'animate-orb-glow',
            size === 'sm' ? 'h-16 w-16' : size === 'md' ? 'h-32 w-32' : size === 'lg' ? 'h-48 w-48' : 'h-56 w-56',
            config.ambientColor
          )}
          style={{ animationDelay: '-1s' }}
        />
      )}

      {/* Main orb */}
      <div
        className={cn(
          'relative rounded-full',
          `bg-gradient-to-br ${config.gradient}`,
          config.glow,
          config.animation,
          sizeClasses[size]
        )}
      >
        {/* Inner highlight */}
        <div
          className={cn(
            'absolute top-[15%] left-[20%]',
            'w-[35%] h-[25%] rounded-full',
            'bg-gradient-to-br from-white/40 to-transparent',
            'blur-[2px]'
          )}
        />

        {/* Core glow */}
        <div
          className={cn(
            'absolute inset-[20%] rounded-full',
            'bg-white/10 blur-[8px]',
            'animate-orb-glow'
          )}
        />

        {/* Reflection ring */}
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'ring-1 ring-inset ring-white/20'
          )}
        />
      </div>

      {/* Outer glow ring */}
      <div
        className={cn(
          'absolute rounded-full',
          'ring-1 ring-white/5',
          'animate-orb-glow',
          size === 'sm' ? 'h-12 w-12' : size === 'md' ? 'h-24 w-24' : size === 'lg' ? 'h-36 w-36' : 'h-48 w-48'
        )}
        style={{ animationDelay: '-0.5s' }}
      />
    </div>
  );
};

export default VibeOrb;
