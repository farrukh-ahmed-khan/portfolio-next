"use client";

import { memo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-scroll";
import ShinyText from "./reactbits/ShinyText";

const navItems = [
  { label: "Home", to: "home" },
  { label: "About", to: "about" },
  { label: "Skills", to: "skills" },
  { label: "Projects", to: "projects" },
  { label: "Contact", to: "contact" },
];

function Navbar({ initials }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, delay: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 border-t border-[rgba(37,99,235,0.15)] transition-all duration-300 ${
        scrolled ? "bg-[rgba(244,247,251,0.88)] backdrop-blur-[14px] shadow-[0_10px_40px_rgba(11,21,38,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="section-shell flex items-center justify-between py-4">
        <Link to="home" smooth duration={700} className="group flex items-center gap-3" aria-label="Go to home section">
          <span className="font-space inline-flex h-12 w-12 items-center justify-center rounded-none border border-[rgba(37,99,235,0.35)] bg-[rgba(37,99,235,0.08)] text-lg font-bold text-[var(--primary)] shadow-[0_0_20px_rgba(37,99,235,0.16)]">
            {initials}
          </span>
          <span className="font-space hidden text-sm uppercase tracking-[0.3em] sm:block">
            <ShinyText text="farrukh.dev" speed={4} />
          </span>
        </Link>

        <div className="hidden items-center gap-8 rounded-full border border-[rgba(37,99,235,0.14)] bg-[rgba(255,255,255,0.55)] px-6 py-3 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              spy
              smooth
              offset={-88}
              duration={700}
              activeClass="text-[var(--text)] after:scale-x-100"
              className="font-space relative cursor-pointer pb-1 text-[11px] uppercase tracking-[0.24em] text-[var(--muted)] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[var(--primary)] after:transition-transform after:duration-300 hover:text-[var(--text)]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(37,99,235,0.22)] bg-[rgba(255,255,255,0.7)] md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={`absolute h-0.5 w-6 bg-[var(--primary)] transition-all duration-300 ${menuOpen ? "rotate-45" : "-translate-y-2"}`} />
          <span className={`absolute h-0.5 w-6 bg-[var(--primary)] transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`absolute h-0.5 w-6 bg-[var(--primary)] transition-all duration-300 ${menuOpen ? "-rotate-45" : "translate-y-2"}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[rgba(37,99,235,0.12)] bg-[rgba(244,247,251,0.96)] backdrop-blur-xl md:hidden"
          >
            <div className="section-shell flex flex-col py-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  spy
                  smooth
                  offset={-80}
                  duration={700}
                  onClick={() => setMenuOpen(false)}
                  activeClass="text-[var(--primary)]"
                  className="font-space border-b border-[rgba(37,99,235,0.1)] py-4 text-sm uppercase tracking-[0.2em] text-[var(--muted)] last:border-b-0"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default memo(Navbar);
