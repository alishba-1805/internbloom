import Link from "next/link";
import type { NavLink } from "@/types";

interface FooterProps {
  links: NavLink[];
}

export default function Footer({ links }: FooterProps) {
  return (
    <footer className="mt-auto bg-forest text-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-2">
        <div>
          <p className="font-display text-2xl">InternBloom</p>
          <p className="mt-1 text-sage">Your first step towards more.</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
            A student project with fictional companies and internships.
            Applications are simulated and are not sent to any employer.
          </p>
        </div>

        <nav aria-label="Footer" className="md:justify-self-end">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 lg:gap-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-2 text-sm hover:text-sage hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15">
        <p className="container-page py-4 text-sm text-white/70">
          CS4032 Web Programming, Assignment 3
        </p>
      </div>
    </footer>
  );
}
