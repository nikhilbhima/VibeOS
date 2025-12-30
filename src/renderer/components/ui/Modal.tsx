import {
  type FC,
  type ReactNode,
  useEffect,
  useRef,
  createContext,
  useContext,
} from 'react';
import { cn } from '../../lib/utils';

interface ModalContextValue {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[90vw]',
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const focusableElements = contentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent): void => {
    if (closeOnOverlayClick && event.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4',
          'bg-black/60 backdrop-blur-sm',
          'animate-modal-backdrop-in'
        )}
        role="dialog"
        aria-modal="true"
      >
        <div
          ref={contentRef}
          className={cn(
            'w-full bg-bg-surface border border-border-default rounded-xl shadow-2xl',
            'animate-modal-content-in',
            sizeStyles[size]
          )}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

export const ModalHeader: FC<ModalHeaderProps> = ({
  children,
  className,
  showCloseButton = true,
}) => {
  const context = useContext(ModalContext);

  return (
    <div
      className={cn(
        'flex items-center justify-between px-6 py-4 border-b border-border-subtle',
        className
      )}
    >
      <h2 className="text-lg font-semibold text-text-primary">{children}</h2>
      {showCloseButton && (
        <button
          onClick={context?.onClose}
          className={cn(
            'p-1.5 rounded-md text-text-muted hover:text-text-primary',
            'hover:bg-bg-hover transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-accent/50'
          )}
          aria-label="Close modal"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export const ModalBody: FC<ModalBodyProps> = ({ children, className }) => {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
};

export const ModalFooter: FC<ModalFooterProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 px-6 py-4 border-t border-border-subtle',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Modal;
