"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { useClerk, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

// Session timeout configuration (in milliseconds)
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes of inactivity
const WARNING_BEFORE_TIMEOUT = 2 * 60 * 1000; // Show warning 2 minutes before timeout
const ACTIVITY_EVENTS = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
  "click",
];

export function SessionTimeoutHandler() {
  const { signOut } = useClerk();
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2 minutes in seconds
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Don't run on public routes
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");

  const handleSignOut = useCallback(async () => {
    try {
      await signOut({ redirectUrl: "/sign-in?reason=session_expired" });
    } catch (error) {
      console.error("Error signing out:", error);
      // Force redirect even if signOut fails
      window.location.href = "/sign-in?reason=session_expired";
    }
  }, [signOut]);

  const clearAllTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const resetTimers = useCallback(() => {
    clearAllTimers();
    setShowWarning(false);
    setCountdown(WARNING_BEFORE_TIMEOUT / 1000);

    // Set warning timer
    warningTimeoutRef.current = setTimeout(() => {
      setShowWarning(true);
      setCountdown(WARNING_BEFORE_TIMEOUT / 1000);

      // Start countdown
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, INACTIVITY_TIMEOUT - WARNING_BEFORE_TIMEOUT);

    // Set logout timer
    timeoutRef.current = setTimeout(() => {
      handleSignOut();
    }, INACTIVITY_TIMEOUT);

    // Update last activity in localStorage for cross-tab sync
    localStorage.setItem("lastActivity", Date.now().toString());
  }, [clearAllTimers, handleSignOut]);

  const handleActivity = useCallback(() => {
    if (isSignedIn && !isPublicRoute) {
      resetTimers();
    }
  }, [isSignedIn, isPublicRoute, resetTimers]);

  const handleStayLoggedIn = useCallback(() => {
    setShowWarning(false);
    resetTimers();
  }, [resetTimers]);

  // Check for session expiry on initial load and cross-tab sync
  useEffect(() => {
    if (!isSignedIn || isPublicRoute) return;

    const checkStoredActivity = () => {
      const lastActivity = localStorage.getItem("lastActivity");
      if (lastActivity) {
        const timeSinceActivity = Date.now() - parseInt(lastActivity, 10);
        if (timeSinceActivity >= INACTIVITY_TIMEOUT) {
          // Session has expired while away
          handleSignOut();
          return true;
        }
      }
      return false;
    };

    // Check on mount
    if (checkStoredActivity()) return;

    // Listen for storage changes (cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "lastActivity" && e.newValue) {
        // Another tab was active, reset our timers
        resetTimers();
      }
      if (e.key === "logout") {
        // Another tab logged out
        handleSignOut();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isSignedIn, isPublicRoute, handleSignOut, resetTimers]);

  // Set up activity listeners
  useEffect(() => {
    if (!isSignedIn || isPublicRoute) {
      clearAllTimers();
      return;
    }

    // Initial timer setup
    resetTimers();

    // Add activity listeners
    ACTIVITY_EVENTS.forEach((event) => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Handle visibility change (user coming back to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isSignedIn) {
        const lastActivity = localStorage.getItem("lastActivity");
        if (lastActivity) {
          const timeSinceActivity = Date.now() - parseInt(lastActivity, 10);
          if (timeSinceActivity >= INACTIVITY_TIMEOUT) {
            handleSignOut();
          } else {
            resetTimers();
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearAllTimers();
      ACTIVITY_EVENTS.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    isSignedIn,
    isPublicRoute,
    handleActivity,
    clearAllTimers,
    resetTimers,
    handleSignOut,
  ]);

  // Don't render anything if not signed in or on public route
  if (!isSignedIn || isPublicRoute || !showWarning) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-amber-600 dark:text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Session Timeout Warning
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your session is about to expire
            </p>
          </div>
        </div>

        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Due to inactivity, you will be automatically logged out in{" "}
          <span className="font-bold text-red-600 dark:text-red-400">
            {formatTime(countdown)}
          </span>{" "}
          for security reasons.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleStayLoggedIn}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Stay Logged In
          </button>
          <button
            onClick={handleSignOut}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Log Out Now
          </button>
        </div>
      </div>
    </div>
  );
}

