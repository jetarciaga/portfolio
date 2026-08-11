"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEventHandler } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const;

type NavItem = (typeof navItems)[number];

function NavItemLink({
  item,
  isHome,
  activeId,
  mobile = false,
  onClick,
}: {
  item: NavItem;
  isHome: boolean;
  activeId: string | null;
  mobile?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const isActive = isHome && activeId === item.id;

  return (
    <li>
      <a
        className={`transition-colors duration-150 ease-out ${
          mobile ? "block px-4 py-3" : "whitespace-nowrap"
        } ${
          isActive
            ? "text-accent"
            : "text-muted hover:text-accent-hover"
        }`}
        href={isHome ? `#${item.id}` : `/#${item.id}`}
        aria-current={isActive ? "location" : undefined}
        onClick={onClick}
      >
        {item.label}
      </a>
    </li>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.75"
    >
      {isOpen ? (
        <path d="m5 5 14 14M19 5 5 19" />
      ) : (
        <>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </>
      )}
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const lastSection = sections[sections.length - 1];
    const isAtPageEnd = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isAtPageEnd()) {
          setActiveId(lastSection.id);
          return;
        }

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          );

        if (visibleSections[0]) {
          setActiveId(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const syncActiveSectionAtPageEnd = () => {
      if (isAtPageEnd()) {
        setActiveId(lastSection.id);
      }
    };

    window.addEventListener("scroll", syncActiveSectionAtPageEnd, {
      passive: true,
    });
    window.addEventListener("resize", syncActiveSectionAtPageEnd);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncActiveSectionAtPageEnd);
      window.removeEventListener("resize", syncActiveSectionAtPageEnd);
    };
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (
        mobileMenuRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target)
      ) {
        return;
      }

      setMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeOnDesktopResize = () => {
      if (window.matchMedia("(min-width: 640px)").matches) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnDesktopResize);

    return () => {
      window.removeEventListener("resize", closeOnDesktopResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:flex-nowrap sm:px-6 sm:py-5">
        <Link
          className="shrink-0 font-mono text-xs font-semibold tracking-tight text-text transition-colors duration-150 ease-out hover:text-accent-hover sm:text-sm"
          href={isHome ? "#home" : "/#home"}
        >
          <span className="sm:hidden">JETHRO</span>
          <span className="hidden sm:inline">JETHRO ARCIAGA</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 overflow-x-auto sm:order-none sm:block sm:w-auto sm:flex-1"
        >
          <ul className="flex min-w-max justify-start gap-4 px-1 py-1 font-mono text-xs sm:justify-end">
            {navItems.map((item) => (
              <NavItemLink
                key={item.id}
                item={item}
                isHome={isHome}
                activeId={activeId}
              />
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 sm:ml-0">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-token border border-border bg-surface text-muted transition-colors duration-150 ease-out hover:border-accent-hover hover:text-accent-hover sm:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-primary-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            title={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon isOpen={menuOpen} />
          </button>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        id="mobile-primary-menu"
        className={`absolute inset-x-0 top-full border-t border-border bg-bg transition duration-150 ease-out motion-reduce:transition-none sm:hidden ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <nav aria-label="Mobile primary">
          <ul className="py-2 font-mono text-sm">
            {navItems.map((item) => (
              <NavItemLink
                key={item.id}
                item={item}
                isHome={isHome}
                activeId={activeId}
                mobile
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
