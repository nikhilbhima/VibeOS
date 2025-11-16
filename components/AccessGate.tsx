"use client";

import { useState, useEffect } from "react";
import { Lock } from "lucide-react";

/**
 * AccessGate Component
 *
 * This component blocks access to the app until the correct code is entered.
 * Access code: "360"
 *
 * TO REMOVE THIS ACCESS GATE:
 * 1. Set NEXT_PUBLIC_ACCESS_REQUIRED=false in .env.local, OR
 * 2. Delete this file and remove <AccessGate> from app/layout.tsx
 */

const ACCESS_CODE = "360";
const STORAGE_KEY = "vibeos_access_granted";

export function AccessGate({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // Check if access gate is required
  const accessRequired = process.env.NEXT_PUBLIC_ACCESS_REQUIRED !== "false";

  useEffect(() => {
    setMounted(true);

    // Check if user already has access
    if (typeof window !== "undefined") {
      const hasAccess = localStorage.getItem(STORAGE_KEY) === "true";
      setIsUnlocked(hasAccess);
    }
  }, []);

  // If access gate is disabled, render children directly
  if (!accessRequired || isUnlocked) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (code === ACCESS_CODE) {
      localStorage.setItem(STORAGE_KEY, "true");
      setIsUnlocked(true);
      setShowModal(false);
      setError("");
    } else {
      setError("Invalid access code");
      setCode("");
    }
  };

  const handleInteraction = (e: React.MouseEvent | React.FocusEvent) => {
    // Allow certain elements to work without access
    const target = e.target as HTMLElement;
    const allowedElements = ["HTML", "BODY"];

    if (!allowedElements.includes(target.tagName)) {
      e.preventDefault();
      e.stopPropagation();
      setShowModal(true);
    }
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Locked overlay - prevents interactions */}
      <div
        onClick={handleInteraction}
        onFocus={handleInteraction}
        style={{ cursor: "default" }}
      >
        {children}
      </div>

      {/* Access Code Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Lock Icon */}
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Early Access Required
                </h2>
                <p className="text-muted-foreground text-sm">
                  VibeOS is currently in private beta
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter access code"
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    autoFocus
                  />
                  {error && (
                    <p className="text-destructive text-sm animate-in fade-in slide-in-from-top-1 duration-200">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Unlock Access
                </button>
              </form>

              {/* Footer */}
              <div className="pt-4 border-t border-border w-full">
                <p className="text-muted-foreground text-xs">
                  Want early access?{" "}
                  <a
                    href="https://x.com/nikhilbhima"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    DM me on 𝕏
                  </a>
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
