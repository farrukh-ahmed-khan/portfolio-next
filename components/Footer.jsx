"use client";

import { memo } from "react";
import { FiGithub, FiGlobe, FiLinkedin } from "react-icons/fi";
import { SiUpwork } from "react-icons/si";
import ShinyText from "./reactbits/ShinyText";

function Footer({ data }) {
  const socials = [
    { label: "GitHub", href: data.contact.socials.github, icon: FiGithub },
    { label: "LinkedIn", href: data.contact.socials.linkedin, icon: FiLinkedin },
    { label: "Upwork", href: data.contact.socials.upwork, icon: SiUpwork },
    { label: "Portfolio", href: data.contact.socials.portfolio, icon: FiGlobe },
  ];

  return (
    <footer className="border-t border-[rgba(37,99,235,0.2)] py-10 shadow-[0_-10px_40px_rgba(37,99,235,0.06)]">
      <div className="section-shell flex flex-col items-center gap-5 text-center">
        <p className="font-space text-lg uppercase tracking-[0.32em]">
          <ShinyText text={`${data.name}.init()`} speed={6} />
        </p>
        <div className="flex gap-4">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${social.label}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(37,99,235,0.22)] bg-[rgba(37,99,235,0.06)] text-[var(--secondary)] transition duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
        <p className="text-sm text-[var(--muted)]">(c) {new Date().getFullYear()} {data.name}. Full stack web development with React, Node.js, Laravel, and clean execution.</p>
      </div>
    </footer>
  );
}

export default memo(Footer);
