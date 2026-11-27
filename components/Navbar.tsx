"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavLink } from "@/types";

interface NavbarProps {
  links: NavLink[];
}

export default function Navbar({ links }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white">
      <nav aria-label="Main" className="container-page">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="InternBloom home"
              width={168}
              height={36}
              loading="eager"
            />
          </Link>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="nav-links"
            className="min-h-11 rounded-lg border border-line px-4 text-sm font-semibold text-forest md:hidden"
          >
            {isOpen ? "Close" : "Menu"}
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-ivory hover:text-forest aria-[current=page]:bg-sage aria-[current=page]:text-forest"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {isOpen && (
          <ul id="nav-links" className="space-y-1 pb-4 md:hidden">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="block rounded-lg px-3 py-3 font-medium text-muted aria-[current=page]:bg-sage aria-[current=page]:text-forest"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
