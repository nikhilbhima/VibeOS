"use client";

import { useState, useEffect } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Sidebar } from "@/components/Sidebar";
import { QuickActions } from "@/components/QuickActions";
import { ChatCard } from "@/components/ChatCard";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Brainstorm");
  const [selectedTool, setSelectedTool] = useState("None");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    // TODO: Call API to generate response
    // For now, just clear the input
    setMessage("");

    // Simulate AI response
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
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border flex items-center px-4 z-30 md:hidden">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="ml-3 text-lg font-semibold">VibeOS</h1>
      </div>

      {/* Top Right Actions */}
      {mounted && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-1.5 sm:gap-2">
          {/* Sign In Button */}
          <button
            className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-background border border-border hover:bg-accent transition-colors text-[10px] sm:text-xs font-medium"
            title="Sign in"
          >
            Sign in
          </button>

          {/* Sign Up Button */}
          <button
            className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors text-[10px] sm:text-xs font-medium"
            title="Sign up"
          >
            Sign up
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 sm:p-2 rounded-lg bg-background border border-border hover:bg-accent transition-colors"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 pt-16 md:pt-0 ${
          isSidebarCollapsed ? "md:ml-[80px]" : "md:ml-[280px]"
        }`}
      >
        {!hasStarted ? (
          // BEFORE first message - Centered layout
          <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 md:px-8 pb-4">
            {/* Heading */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-6 sm:mb-8 text-foreground">
              What are you building today?
            </h1>

            {/* Quick Actions */}
            <div className="w-full max-w-[900px] mb-4 sm:mb-6">
              <QuickActions selected={selectedMode} onSelect={setSelectedMode} />
            </div>

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
        ) : (
          // AFTER first message - Messages at top, chat box at bottom
          <>
            {/* Messages Area - Scrollable */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-8 pt-16 sm:pt-20 pb-4">
              <div className="w-full max-w-[900px] mx-auto space-y-2 sm:space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                        max-w-[90%] sm:max-w-[85%] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm
                        ${
                          msg.role === "user"
                            ? "bg-accent text-accent-foreground"
                            : "bg-card text-card-foreground border border-border"
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
            <div className="bg-background px-3 sm:px-4 md:px-8 py-3 sm:py-4">
              <div className="w-full max-w-[900px] mx-auto space-y-3 sm:space-y-4">
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
