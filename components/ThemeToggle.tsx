"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const themeModes = ["light", "dark", "system"] as const;
type ThemeMode = (typeof themeModes)[number];

const themeLabels: Record<ThemeMode, string> = {
  light: "light",
  dark: "dark",
  system: "system",
};

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function isThemeMode(theme: string | undefined): theme is ThemeMode {
  return themeModes.includes(theme as ThemeMode);
}

function ThemeIcon({ theme }: { theme: ThemeMode }) {
  if (theme === "light") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <circle cx="12" cy="12" r="3.5" />
        <path strokeLinecap="round" d="M12 2.75v2M12 19.25v2M4.75 12h-2M21.25 12h-2M5.46 5.46 6.88 6.88M18.54 18.54l-1.42-1.42M18.54 5.46l-1.42 1.42M5.46 18.54l1.42-1.42" />
      </svg>
    );
  }

  if (theme === "dark") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 15.1A8.25 8.25 0 0 1 8.9 3.75 8.26 8.26 0 1 0 20.25 15.1Z"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <rect x="3.25" y="4.25" width="17.5" height="12" rx="1.5" />
      <path strokeLinecap="round" d="M8 20h8M12 16.25V20" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const currentTheme = mounted && isThemeMode(theme) ? theme : "system";
  const currentIndex = themeModes.indexOf(currentTheme);
  const nextTheme = themeModes[(currentIndex + 1) % themeModes.length];
  const currentLabel = themeLabels[currentTheme];
  const nextLabel = themeLabels[nextTheme];

  return (
    <button
      type="button"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-token border border-border bg-surface text-muted transition-colors duration-150 ease-out hover:border-accent-hover hover:text-accent-hover disabled:cursor-wait"
      onClick={() => setTheme(nextTheme)}
      disabled={!mounted}
      aria-label={
        mounted
          ? `Theme is ${currentLabel}. Switch to ${nextLabel} theme.`
          : "Theme preference loading"
      }
      title={
        mounted
          ? `Theme: ${currentLabel} · switch to ${nextLabel}`
          : "Theme preference loading"
      }
    >
      {mounted ? (
        <ThemeIcon theme={currentTheme} />
      ) : (
        <span aria-hidden="true" className="h-4 w-4" />
      )}
      <span className="sr-only">
        {mounted ? `${currentLabel} theme selected` : "Theme preference loading"}
      </span>
    </button>
  );
}
