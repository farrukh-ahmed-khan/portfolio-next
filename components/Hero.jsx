"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { FiArrowDownRight, FiArrowUpRight, FiGithub, FiGrid } from "react-icons/fi";
import BlurText from "./reactbits/BlurText";
import GradientText from "./reactbits/GradientText";
import StarBorder from "./reactbits/StarBorder";
import Particles from "./reactbits/Particles";
import Lightfall from "./reactbits/Lightfall";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function Hero({ data }) {
  const [displayText, setDisplayText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const titles = useMemo(() => data.heroTitles, [data.heroTitles]);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const speed = deleting ? 55 : 90;

    const timer = window.setTimeout(() => {
      if (!deleting && displayText.length < currentTitle.length) {
        setDisplayText(currentTitle.slice(0, displayText.length + 1));
        return;
      }

      if (deleting && displayText.length > 0) {
        setDisplayText(currentTitle.slice(0, displayText.length - 1));
        return;
      }

      if (!deleting) {
        setDeleting(true);
        return;
      }

      setDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, displayText === currentTitle && !deleting ? 1400 : speed);

    return () => window.clearTimeout(timer);
  }, [deleting, displayText, titleIndex, titles]);

  return (
    <section id="home" className="hero-spot relative min-h-screen overflow-hidden pt-28" aria-label="Hero section">
      <Lightfall count={24} />
      <Particles count={50} />
      <div className="section-shell relative z-10 py-10 sm:py-16">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative">
            <motion.div variants={itemVariants} className="font-space flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--secondary)]">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(16,185,129,0.35)] bg-[rgba(16,185,129,0.1)] px-4 py-2 text-emerald-600">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Available for projects
              </span>
              <span className="terminal-pill rounded-full px-4 py-2">{"> live_session"}</span>
              <span className="rounded-full border border-[rgba(37,99,235,0.14)] bg-[rgba(255,255,255,0.48)] px-4 py-2 text-[var(--muted)]">
                Karachi / Remote
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex items-start gap-5">
              <span className="hero-index hidden xl:block">01</span>
              <div>
                <p className="hero-kicker">React frontends. REST APIs. Production full stack delivery.</p>
                <h1 className="font-display mt-5 max-w-5xl text-[clamp(3rem,7.5vw,6.8rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                  <BlurText text="Full stack web applications built with" stagger={0.09} />{" "}
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(12px)", y: 18 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 0.6, delay: 0.54, ease: [0.25, 0.4, 0.25, 1] }}
                    className="inline-block"
                  >
                    <GradientText>clarity,</GradientText>
                  </motion.span>{" "}
                  <BlurText text="speed, and scale." delay={0.63} stagger={0.09} />
                </h1>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="hero-panel p-6 sm:p-7">
                <p className="font-space text-xs uppercase tracking-[0.24em] text-[var(--primary)]">Identity</p>
                <p className="mt-4 text-xl leading-9 text-[var(--text)]">
                  {data.name} develops responsive web products across React, Next.js, Node.js, Laravel, MongoDB, and MySQL.
                </p>
                <div className="mt-6 font-space text-xl text-[var(--secondary)] sm:text-2xl">
                  <span>{displayText}</span>
                  <span className="blink-cursor">|</span>
                </div>
              </div>

              <div className="hero-panel flex flex-col justify-between p-6 sm:p-7">
                <div>
                  <p className="font-space text-xs uppercase tracking-[0.24em] text-[var(--primary)]">Brief</p>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{data.bio}</p>
                </div>
                <div className="mt-8 flex gap-3 text-[var(--secondary)]">
                  <FiGithub size={18} />
                  <FiGrid size={18} />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-4 sm:flex-row">
              <StarBorder color="#06b6d4" speed="5s" className="transition duration-300 hover:-translate-y-1">
                <ScrollLink
                  to="projects"
                  smooth
                  offset={-80}
                  duration={700}
                  className="font-space inline-flex w-full items-center justify-center gap-3 rounded-none bg-[var(--primary)] px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-[var(--bg)] shadow-[0_0_35px_rgba(37,99,235,0.24)]"
                >
                  View Work
                  <FiArrowUpRight size={16} />
                </ScrollLink>
              </StarBorder>

              <StarBorder color="#2563eb" speed="6s" className="transition duration-300 hover:-translate-y-1">
                <a
                  href={data.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-space inline-flex w-full items-center justify-center rounded-none border border-[rgba(37,99,235,0.28)] bg-[rgba(255,255,255,0.85)] px-7 py-4 text-sm uppercase tracking-[0.22em] text-[var(--text)] transition duration-300 hover:border-[var(--primary)]"
                >
                  Download CV_
                </a>
              </StarBorder>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 grid gap-4 sm:grid-cols-3">
              {data.stats.map((stat, index) => (
                <div key={stat.label} className="hero-stat-card">
                  <p className="font-space text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">0{index + 1}</p>
                  <p className="mt-6 font-space text-4xl text-[var(--primary)]">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[var(--text)]">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="hero-stack"
          >
            <div className="hero-workspace-panel">
              <div className="workspace-topbar">
                <span />
                <span />
                <span />
                <p>active-build.ts</p>
              </div>

              <div className="workspace-body">
                <p className="font-space text-[11px] uppercase tracking-[0.24em] text-[var(--primary)]">// production_workbench</p>
                <h2 className="mt-5 text-3xl font-bold leading-tight text-[var(--text)] sm:text-4xl">
                  Full stack delivery without the noise.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  Clean interfaces, reliable APIs, maintainable database layers, and responsive product flows.
                </p>

                <div className="hero-workflow-list">
                  {["UI architecture", "REST API design", "Database modeling", "Production handoff"].map((item, index) => (
                    <div key={item} className="hero-workflow-row">
                      <span>0{index + 1}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-focus-grid">
                <div>
                  <p className="font-space text-[11px] uppercase tracking-[0.2em] text-[var(--primary)]">Frontend</p>
                  <p>React, Next.js, Redux, Tailwind</p>
                </div>
                <div>
                  <p className="font-space text-[11px] uppercase tracking-[0.2em] text-[var(--primary)]">Backend</p>
                  <p>Node, Express, Laravel, APIs</p>
                </div>
              </div>

              <div className="hero-terminal-window">
                <p className="text-[var(--secondary)]">deploy.status = "ready"</p>
                <p>quality.gate = ["responsive", "secure", "scalable"]</p>
                <p>ship({data.name.split(" ")[0].toLowerCase()}.portfolio)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollLink
        to="about"
        smooth
        offset={-80}
        duration={700}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 animate-bounce items-center justify-center rounded-full border border-[rgba(37,99,235,0.3)] bg-[rgba(255,255,255,0.6)] p-3 text-[var(--primary)] shadow-[0_0_20px_rgba(37,99,235,0.2)]"
        aria-label="Scroll to about section"
      >
        <FiArrowDownRight size={20} />
      </ScrollLink>
    </section>
  );
}

export default memo(Hero);
