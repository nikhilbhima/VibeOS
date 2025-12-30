import { type FC, type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

type ToggleSize = 'sm' | 'md' | 'lg';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: ToggleSize;
  label?: string;
  description?: string;
}

const sizeStyles: Record<ToggleSize, { track: string; thumb: string; translate: string }> = {
  sm: {
    track: 'h-4 w-7',
    thumb: 'h-3 w-3',
    translate: 'translate-x-3',
  },
  md: {
    track: 'h-5 w-9',
    thumb: 'h-4 w-4',
    translate: 'translate-x-4',
  },
  lg: {
    track: 'h-6 w-11',
    thumb: 'h-5 w-5',
    translate: 'translate-x-5',
  },
};

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ size = 'md', label, description, className, disabled, checked, onChange, id, ...props }, ref) => {
    const inputId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
    const styles = sizeStyles[size];

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <div className="relative flex-shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              'relative inline-flex items-center rounded-full cursor-pointer transition-colors duration-200',
              'bg-bg-elevated peer-checked:bg-accent',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-accent/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-base',
              'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
              styles.track
            )}
          >
            <span
              className={cn(
                'absolute left-0.5 rounded-full bg-white shadow-sm transition-transform duration-200',
                'peer-checked:translate-x-full',
                styles.thumb,
                checked && styles.translate
              )}
            />
          </label>
        </div>
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  'block text-sm font-medium text-text-primary cursor-pointer',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-text-muted mt-0.5">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

// Switch button group variant
interface SwitchOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SwitchGroupProps {
  options: SwitchOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SwitchGroup: FC<SwitchGroupProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center p-0.5 bg-bg-elevated rounded-lg',
        className
      )}
      role="radiogroup"
    >
      {options.map((option) => {
        const isSelected = option.id === value;
        return (
          <button
            key={option.id}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
              isSelected
                ? 'bg-bg-surface text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {option.icon && <span className="h-4 w-4">{option.icon}</span>}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default Toggle;
