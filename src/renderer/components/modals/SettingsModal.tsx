import { type FC, useState } from 'react';
import { cn } from '../../lib/utils';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = 'general' | 'appearance' | 'claude' | 'shortcuts';

/**
 * Premium SettingsModal Component
 *
 * Design Philosophy: Organized preferences
 * - Glass-morphism modal with backdrop
 * - Tabbed navigation
 * - Toggle and select controls
 * - Keyboard shortcut display
 */
export const SettingsModal: FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-black/60 backdrop-blur-sm',
          'animate-in fade-in duration-200'
        )}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full max-w-2xl mx-4',
          'bg-bg-surface/95 backdrop-blur-xl',
          'rounded-2xl overflow-hidden',
          'ring-1 ring-inset ring-white/[0.08]',
          'shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5)]',
          'animate-in zoom-in-95 fade-in duration-200'
        )}
      >
        {/* Header */}
        <div
          className={cn(
            'flex items-center justify-between px-6 py-4',
            'border-b border-white/[0.04]'
          )}
        >
          <h2 className="text-lg font-semibold text-text-primary tracking-[-0.01em]">
            Settings
          </h2>
          <button
            onClick={onClose}
            className={cn(
              'p-2 rounded-lg',
              'text-text-muted hover:text-text-primary',
              'hover:bg-white/[0.04]',
              'transition-colors duration-150'
            )}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Content area */}
        <div className="flex">
          {/* Sidebar navigation */}
          <div
            className={cn(
              'w-48 flex-shrink-0 p-4',
              'border-r border-white/[0.04]',
              'bg-white/[0.01]'
            )}
          >
            <nav className="space-y-1">
              <TabButton
                icon={<SettingsIcon className="w-4 h-4" />}
                label="General"
                isActive={activeTab === 'general'}
                onClick={() => setActiveTab('general')}
              />
              <TabButton
                icon={<PaletteIcon className="w-4 h-4" />}
                label="Appearance"
                isActive={activeTab === 'appearance'}
                onClick={() => setActiveTab('appearance')}
              />
              <TabButton
                icon={<BrainIcon className="w-4 h-4" />}
                label="Claude"
                isActive={activeTab === 'claude'}
                onClick={() => setActiveTab('claude')}
              />
              <TabButton
                icon={<KeyboardIcon className="w-4 h-4" />}
                label="Shortcuts"
                isActive={activeTab === 'shortcuts'}
                onClick={() => setActiveTab('shortcuts')}
              />
            </nav>
          </div>

          {/* Settings content */}
          <div className="flex-1 p-6 max-h-[60vh] overflow-y-auto">
            {activeTab === 'general' && <GeneralSettings />}
            {activeTab === 'appearance' && <AppearanceSettings />}
            {activeTab === 'claude' && <ClaudeSettings />}
            {activeTab === 'shortcuts' && <ShortcutsSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tab button component
const TabButton: FC<{
  icon: JSX.Element;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg',
      'text-sm font-medium',
      'transition-all duration-150',
      isActive
        ? cn(
            'bg-white/[0.08] text-text-primary',
            'ring-1 ring-inset ring-white/[0.08]'
          )
        : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.04]'
    )}
  >
    {icon}
    <span>{label}</span>
  </button>
);

// General settings tab
const GeneralSettings: FC = () => (
  <div className="space-y-6">
    <SettingsSection title="Projects">
      <SettingItem
        label="Default project location"
        description="Where new projects are created"
      >
        <PathSelector path="~/Documents/VibeOS Projects" />
      </SettingItem>
      <SettingItem
        label="Auto-save sessions"
        description="Automatically save chat sessions"
      >
        <Toggle defaultChecked />
      </SettingItem>
    </SettingsSection>

    <SettingsSection title="Preview">
      <SettingItem
        label="Default device"
        description="Initial device frame size"
      >
        <Select
          options={[
            { value: 'desktop', label: 'Desktop' },
            { value: 'tablet', label: 'Tablet' },
            { value: 'mobile', label: 'Mobile' },
          ]}
          defaultValue="desktop"
        />
      </SettingItem>
      <SettingItem
        label="Auto-refresh preview"
        description="Refresh when files change"
      >
        <Toggle defaultChecked />
      </SettingItem>
    </SettingsSection>
  </div>
);

// Appearance settings tab
const AppearanceSettings: FC = () => (
  <div className="space-y-6">
    <SettingsSection title="Theme">
      <SettingItem
        label="Color theme"
        description="Choose your preferred theme"
      >
        <Select
          options={[
            { value: 'dark', label: 'Dark' },
            { value: 'light', label: 'Light' },
            { value: 'system', label: 'System' },
          ]}
          defaultValue="dark"
        />
      </SettingItem>
      <SettingItem
        label="Accent color"
        description="Primary accent color"
      >
        <ColorPicker />
      </SettingItem>
    </SettingsSection>

    <SettingsSection title="Layout">
      <SettingItem
        label="Sidebar position"
        description="Left or right side"
      >
        <Select
          options={[
            { value: 'left', label: 'Left' },
            { value: 'right', label: 'Right' },
          ]}
          defaultValue="left"
        />
      </SettingItem>
      <SettingItem
        label="Compact mode"
        description="Reduce spacing for more content"
      >
        <Toggle />
      </SettingItem>
    </SettingsSection>
  </div>
);

// Claude settings tab
const ClaudeSettings: FC = () => (
  <div className="space-y-6">
    <SettingsSection title="Model">
      <SettingItem
        label="Default model"
        description="Which Claude model to use"
      >
        <Select
          options={[
            { value: 'haiku', label: 'Haiku (Fast)' },
            { value: 'sonnet', label: 'Sonnet (Balanced)' },
            { value: 'opus', label: 'Opus (Powerful)' },
          ]}
          defaultValue="sonnet"
        />
      </SettingItem>
    </SettingsSection>

    <SettingsSection title="Behavior">
      <SettingItem
        label="Default mode"
        description="Start in Plan or Build mode"
      >
        <Select
          options={[
            { value: 'plan', label: 'Plan' },
            { value: 'build', label: 'Build' },
          ]}
          defaultValue="build"
        />
      </SettingItem>
      <SettingItem
        label="Stream responses"
        description="Show responses as they generate"
      >
        <Toggle defaultChecked />
      </SettingItem>
    </SettingsSection>

    <SettingsSection title="Usage">
      <SettingItem
        label="Show usage in status bar"
        description="Display token count"
      >
        <Toggle defaultChecked />
      </SettingItem>
    </SettingsSection>
  </div>
);

// Shortcuts settings tab
const ShortcutsSettings: FC = () => {
  const shortcuts = [
    { action: 'New project', keys: ['Cmd', 'N'] },
    { action: 'Open project', keys: ['Cmd', 'O'] },
    { action: 'Command palette', keys: ['Cmd', 'K'] },
    { action: 'Toggle sidebar', keys: ['Cmd', 'B'] },
    { action: 'Toggle preview', keys: ['Cmd', 'P'] },
    { action: 'Toggle code view', keys: ['Cmd', 'E'] },
    { action: 'Settings', keys: ['Cmd', ','] },
    { action: 'Toggle Plan/Build', keys: ['Cmd', 'Shift', 'P'] },
    { action: 'Focus chat input', keys: ['Cmd', 'J'] },
    { action: 'Send message', keys: ['Enter'] },
    { action: 'New line', keys: ['Shift', 'Enter'] },
    { action: 'Cancel generation', keys: ['Esc'] },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-text-muted mb-6">
        Keyboard shortcuts for quick navigation and actions.
      </p>
      <div className="space-y-2">
        {shortcuts.map(({ action, keys }) => (
          <div
            key={action}
            className={cn(
              'flex items-center justify-between py-2 px-3 rounded-lg',
              'hover:bg-white/[0.02]',
              'transition-colors duration-150'
            )}
          >
            <span className="text-sm text-text-secondary">{action}</span>
            <div className="flex items-center gap-1">
              {keys.map((key, i) => (
                <kbd
                  key={i}
                  className={cn(
                    'px-2 py-1 rounded',
                    'bg-white/[0.04] text-text-muted',
                    'ring-1 ring-inset ring-white/[0.06]',
                    'text-xs font-mono'
                  )}
                >
                  {key}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Settings section wrapper
const SettingsSection: FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div>
    <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-4">
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

// Setting item wrapper
const SettingItem: FC<{
  label: string;
  description: string;
  children: React.ReactNode;
}> = ({ label, description, children }) => (
  <div
    className={cn(
      'flex items-center justify-between gap-4 py-3 px-4 rounded-lg',
      'bg-white/[0.02]',
      'ring-1 ring-inset ring-white/[0.04]'
    )}
  >
    <div>
      <p className="text-sm font-medium text-text-primary">{label}</p>
      <p className="text-xs text-text-muted mt-0.5">{description}</p>
    </div>
    {children}
  </div>
);

// Toggle component
const Toggle: FC<{ defaultChecked?: boolean }> = ({ defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <button
      onClick={() => setChecked(!checked)}
      className={cn(
        'relative w-10 h-6 rounded-full',
        'transition-colors duration-200',
        checked
          ? 'bg-accent'
          : 'bg-white/[0.08] ring-1 ring-inset ring-white/[0.08]'
      )}
    >
      <div
        className={cn(
          'absolute top-1 w-4 h-4 rounded-full',
          'bg-white shadow-sm',
          'transition-all duration-200',
          checked ? 'left-5' : 'left-1'
        )}
      />
    </button>
  );
};

// Select component
const Select: FC<{
  options: { value: string; label: string }[];
  defaultValue?: string;
}> = ({ options, defaultValue }) => {
  const [value, setValue] = useState(defaultValue || options[0]?.value);

  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={cn(
        'px-3 py-1.5 rounded-lg',
        'bg-white/[0.04] text-text-primary',
        'ring-1 ring-inset ring-white/[0.08]',
        'text-sm',
        'outline-none focus:ring-accent/40',
        'cursor-pointer'
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

// Color picker
const ColorPicker: FC = () => {
  const colors = [
    { name: 'Orange', value: 'hsl(25, 84%, 55%)' },
    { name: 'Blue', value: 'hsl(220, 90%, 55%)' },
    { name: 'Green', value: 'hsl(142, 70%, 45%)' },
    { name: 'Purple', value: 'hsl(280, 70%, 55%)' },
    { name: 'Pink', value: 'hsl(330, 80%, 55%)' },
  ];

  const [selected, setSelected] = useState(colors[0].value);

  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <button
          key={color.value}
          onClick={() => setSelected(color.value)}
          title={color.name}
          className={cn(
            'w-6 h-6 rounded-full',
            'ring-2 ring-offset-2 ring-offset-bg-surface',
            'transition-all duration-150',
            selected === color.value ? 'ring-white/40' : 'ring-transparent'
          )}
          style={{ backgroundColor: color.value }}
        />
      ))}
    </div>
  );
};

// Path selector
const PathSelector: FC<{ path: string }> = ({ path }) => (
  <button
    className={cn(
      'flex items-center gap-2 px-3 py-1.5 rounded-lg',
      'bg-white/[0.04] text-text-secondary',
      'ring-1 ring-inset ring-white/[0.08]',
      'hover:bg-white/[0.06] hover:text-text-primary',
      'text-sm font-mono',
      'transition-colors duration-150'
    )}
  >
    <FolderIcon className="w-4 h-4 text-text-muted" />
    <span className="truncate max-w-[180px]">{path}</span>
  </button>
);

// Icons
const XIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SettingsIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PaletteIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

const BrainIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const KeyboardIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm2 2v2h2V8H5zm4 0v2h2V8H9zm4 0v2h2V8h-2zm4 0v2h2V8h-2zm-8 4v2h2v-2H9zm4 0v2h2v-2h-2zM5 14v2h14v-2H5z" />
  </svg>
);

const FolderIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

export default SettingsModal;
