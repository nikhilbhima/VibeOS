"use client";

import { useState, useEffect } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Sidebar } from "@/components/Sidebar";
import { QuickActions } from "@/components/QuickActions";
import { ChatCard } from "@/components/ChatCard";
import { useAccessGate } from "@/components/AccessGate";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const { hasAccess, requestAccess } = useAccessGate();
  const [mounted, setMounted] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Brainstorm");
  const [selectedTool, setSelectedTool] = useState("None");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I'll help you with ${selectedMode.toLowerCase()} using ${selectedTool}. This is where the AI response will appear.`,
        },
      ]);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setMessage("");
  };

  const hasStarted = messages.length > 0;

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gold/10 via-gold/5 to-transparent blur-3xl opacity-60 dark:opacity-30" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-gold/8 via-transparent to-transparent blur-3xl opacity-50 dark:opacity-20" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-border/50 flex items-center px-4 z-30 md:hidden">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="ml-3 text-lg font-semibold font-[family-name:var(--font-display)] text-gradient-gold">
          VibeOS
        </span>
      </div>

      {/* Top Right Actions - hide on mobile when sidebar is open */}
      {mounted && (
        <div className={`fixed top-4 right-4 z-40 flex items-center gap-2 animate-fade-in ${!isSidebarCollapsed ? "hidden md:flex" : ""}`}>
          {/* Sign In Button */}
          <button
            onClick={() => {
              if (!hasAccess) {
                requestAccess();
              }
            }}
            className="px-3 sm:px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 hover:border-gold/50 hover:bg-secondary/50 transition-all text-xs font-medium press-effect"
            title="Sign in"
          >
            Sign in
          </button>

          {/* Sign Up Button */}
          <button
            onClick={() => {
              if (!hasAccess) {
                requestAccess();
              }
            }}
            className="px-3 sm:px-4 py-2 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all text-xs font-medium press-effect"
            title="Sign up"
          >
            Sign up
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 hover:border-gold/50 hover:bg-secondary/50 transition-all press-effect"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 pt-16 md:pt-0 relative z-10 ${
          isSidebarCollapsed ? "md:ml-[80px]" : "md:ml-[280px]"
        }`}
      >
        {!hasStarted ? (
          // BEFORE first message - Centered layout with hero
          <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pb-8">
            {/* Hero Section */}
            <div className="text-center mb-8 sm:mb-10 animate-fade-up">
              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 font-[family-name:var(--font-display)]">
                <span className="text-gradient-gold">Vibe</span>
                <span className="text-foreground">OS</span>
              </h1>

              {/* Tagline */}
              <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed">
                Plan better. Build faster.
                <br />
                <span className="text-sm opacity-70">The intelligent workspace for vibe-coding</span>
              </p>
            </div>

            {/* Quick Actions */}
            <div className="w-full max-w-[900px] mb-6 animate-fade-up delay-200" style={{ opacity: 0, animationFillMode: 'forwards' }}>
              <QuickActions selected={selectedMode} onSelect={setSelectedMode} />
            </div>

            {/* Chat Card */}
            <div className="w-full max-w-[900px] animate-fade-up delay-300" style={{ opacity: 0, animationFillMode: 'forwards' }}>
              <ChatCard
                selectedMode={selectedMode}
                selectedTool={selectedTool}
                onToolChange={setSelectedTool}
                message={message}
                onMessageChange={setMessage}
                onSend={handleSend}
                onNewChat={handleNewChat}
                hasMessages={hasStarted}
              />
            </div>
          </div>
        ) : (
          // AFTER first message - Messages at top, chat box at bottom
          <>
            {/* Messages Area - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-4">
              <div className="w-full max-w-[900px] mx-auto space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div
                      className={`
                        max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                        ${
                          msg.role === "user"
                            ? "bg-foreground text-background"
                            : "bg-card text-card-foreground border border-border shadow-sm"
                        }
                      `}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section - Fixed at bottom */}
            <div className="bg-gradient-to-t from-background via-background to-background/80 px-4 sm:px-6 md:px-8 py-4 border-t border-border/50">
              <div className="w-full max-w-[900px] mx-auto space-y-4">
                {/* Quick Actions */}
                <QuickActions selected={selectedMode} onSelect={setSelectedMode} compact />

                {/* Chat Card */}
                <ChatCard
                  selectedMode={selectedMode}
                  selectedTool={selectedTool}
                  onToolChange={setSelectedTool}
                  message={message}
                  onMessageChange={setMessage}
                  onSend={handleSend}
                  onNewChat={handleNewChat}
                  hasMessages={hasStarted}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
