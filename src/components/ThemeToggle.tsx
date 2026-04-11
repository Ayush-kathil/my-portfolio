"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent as ReactPointerEvent } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_STORAGE_KEY = "portfolio-theme";
const THEME_CHANGE_EVENT = "portfolio-theme-change";

const subscribeToTheme = (onStoreChange: () => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
};

const getThemeSnapshot = () => {
  if (typeof window === "undefined") {
    return "dark" as const;
  }

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => "dark");
  const [isMobile, setIsMobile] = useState(false);
  const [mobilePos, setMobilePos] = useState<{ x: number; y: number }>(() => {
    if (typeof window === "undefined") {
      return { x: 16, y: 96 };
    }

    const savedPos = localStorage.getItem("portfolio-theme-toggle-pos");
    if (savedPos) {
      try {
        const parsed = JSON.parse(savedPos) as { x: number; y: number };
        if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          return parsed;
        }
      } catch {
        // Ignore invalid saved positions.
      }
    }

    return { x: 16, y: 96 };
  });
  const [dragging, setDragging] = useState(false);
  const dragStartRef = useRef<{ pointerX: number; pointerY: number; startX: number; startY: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(max-width: 767px)");
    const syncViewportState = () => setIsMobile(media.matches);

    syncViewportState();
    media.addEventListener("change", syncViewportState);

    return () => media.removeEventListener("change", syncViewportState);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    document.documentElement.classList.add("theme-transition");
    const nextTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));

    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 320);
  };

  const clampMobilePos = (x: number, y: number) => {
    if (typeof window === "undefined") {
      return { x, y };
    }

    const buttonSize = 56;
    const edgePadding = 8;
    const reservedBottom = 90;
    const maxX = Math.max(edgePadding, window.innerWidth - buttonSize - edgePadding);
    const maxY = Math.max(edgePadding, window.innerHeight - buttonSize - reservedBottom);

    return {
      x: Math.min(Math.max(x, edgePadding), maxX),
      y: Math.min(Math.max(y, edgePadding), maxY),
    };
  };

  const snapToHorizontalEdge = (x: number, y: number) => {
    if (typeof window === "undefined") {
      return { x, y };
    }

    const buttonSize = 56;
    const edgePadding = 8;
    const maxX = Math.max(edgePadding, window.innerWidth - buttonSize - edgePadding);
    const snappedX = x < window.innerWidth / 2 ? edgePadding : maxX;
    return clampMobilePos(snappedX, y);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!isMobile) {
      return;
    }

    setDragging(false);
    dragStartRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      startX: mobilePos.x,
      startY: mobilePos.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!isMobile || !dragStartRef.current) {
      return;
    }

    const deltaX = event.clientX - dragStartRef.current.pointerX;
    const deltaY = event.clientY - dragStartRef.current.pointerY;
    const movedEnough = Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4;
    if (movedEnough) {
      setDragging(true);
    }

    const next = clampMobilePos(dragStartRef.current.startX + deltaX, dragStartRef.current.startY + deltaY);
    setMobilePos(next);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!isMobile) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);

    if (!dragging) {
      toggleTheme();
    } else {
      const pointer = dragStartRef.current;
      const deltaX = pointer ? event.clientX - pointer.pointerX : 0;
      const deltaY = pointer ? event.clientY - pointer.pointerY : 0;
      const unsnapped = pointer
        ? clampMobilePos(pointer.startX + deltaX, pointer.startY + deltaY)
        : clampMobilePos(mobilePos.x, mobilePos.y);
      const snapped = snapToHorizontalEdge(unsnapped.x, unsnapped.y);
      setMobilePos(snapped);
      localStorage.setItem("portfolio-theme-toggle-pos", JSON.stringify(snapped));
    }

    setTimeout(() => setDragging(false), 0);
    dragStartRef.current = null;
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        className="hidden md:block fixed top-8 right-8 z-[9999] p-4 rounded-full bg-[var(--bg-primary)]/70 backdrop-blur-md text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]"
        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={theme === "light"}
        title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        suppressHydrationWarning
      >
        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <button
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStartRef.current = null;
          setDragging(false);
        }}
        onClick={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleTheme();
          }
        }}
        className="md:hidden fixed z-[9999] p-4 rounded-full bg-[var(--bg-primary)]/85 backdrop-blur-md text-[var(--text-primary)] border border-[var(--border-color)] shadow-[0_8px_20px_0_rgba(0,0,0,0.2)] dark:shadow-[0_8px_20px_0_rgba(255,255,255,0.08)] active:scale-95 touch-none"
        style={{ left: `${mobilePos.x}px`, top: `${mobilePos.y}px`, transition: dragging ? "none" : "left 220ms ease, top 220ms ease" }}
        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={theme === "light"}
        title="Drag to move. Tap to switch theme."
        suppressHydrationWarning
      >
        {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
      </button>
    </>
  );
}
