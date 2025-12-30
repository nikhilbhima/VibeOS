import {
  type FC,
  type ReactNode,
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { cn } from '../../lib/utils';

interface DropdownContextValue {
  isOpen: boolean;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

interface DropdownProps {
  children: ReactNode;
  className?: string;
}

interface DropdownTriggerProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
}

interface DropdownItemProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  danger?: boolean;
  icon?: ReactNode;
  shortcut?: string;
  onSelect?: () => void;
}

interface DropdownSeparatorProps {
  className?: string;
}

interface DropdownLabelProps {
  children: ReactNode;
  className?: string;
}

export const Dropdown: FC<DropdownProps> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = (): void => setIsOpen(false);
  const toggle = (): void => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, close }}>
      <div ref={containerRef} className={cn('relative inline-flex', className)}>
        {typeof children === 'function'
          ? (children as (props: { isOpen: boolean; toggle: () => void }) => ReactNode)({
              isOpen,
              toggle,
            })
          : children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger: FC<DropdownTriggerProps> = ({
  children,
  className,
}) => {
  const context = useContext(DropdownContext);

  // The trigger component just renders its children
  // Parent Dropdown handles the toggle via render prop
  return (
    <div className={cn('cursor-pointer', className)}>
      {children}
    </div>
  );
};

export const DropdownMenu: FC<DropdownMenuProps> = ({
  children,
  className,
  align = 'start',
}) => {
  const context = useContext(DropdownContext);

  if (!context?.isOpen) return null;

  const alignStyles = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div
      className={cn(
        'absolute z-50 top-full mt-1 min-w-[180px] py-1',
        'bg-bg-elevated border border-border-default rounded-lg shadow-xl',
        'animate-scale-in origin-top',
        alignStyles[align],
        className
      )}
      role="menu"
    >
      {children}
    </div>
  );
};

export const DropdownItem: FC<DropdownItemProps> = ({
  children,
  className,
  disabled = false,
  danger = false,
  icon,
  shortcut,
  onSelect,
}) => {
  const context = useContext(DropdownContext);

  const handleClick = (): void => {
    if (disabled) return;
    onSelect?.();
    context?.close();
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors',
        'focus:outline-none focus:bg-bg-hover',
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : danger
          ? 'text-error hover:bg-error/10'
          : 'text-text-primary hover:bg-bg-hover',
        className
      )}
    >
      {icon && <span className="h-4 w-4 text-text-muted">{icon}</span>}
      <span className="flex-1">{children}</span>
      {shortcut && (
        <kbd className="text-xs text-text-muted font-mono">{shortcut}</kbd>
      )}
    </div>
  );
};

export const DropdownSeparator: FC<DropdownSeparatorProps> = ({ className }) => {
  return (
    <div
      className={cn('h-px bg-border-subtle my-1', className)}
      role="separator"
    />
  );
};

export const DropdownLabel: FC<DropdownLabelProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'px-3 py-1.5 text-xs font-medium text-text-muted uppercase tracking-wider',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Dropdown;
