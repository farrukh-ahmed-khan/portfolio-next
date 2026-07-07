"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import TiltedCard from "./reactbits/TiltedCard";

function StatCounter({ value, suffix, label }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let frameId;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const start = performance.now();
        const duration = 1500;

        const tick = (timestamp) => {
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) frameId = window.requestAnimationFrame(tick);
        };

        frameId = window.requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [value]);

  return (
    <div ref={ref} className="glass-panel rounded-3xl p-6">
      <div className="font-space text-3xl font-bold text-[var(--primary)]">
        {count}
        {suffix}
      </div>
      <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{label}</p>
    </div>
  );
}

function About({ data }) {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.75 }}
      className="py-24 sm:py-28"
      aria-labelledby="about-heading"
    >
      <div className="section-shell">
        <p className="section-label">// ABOUT_ME</p>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -right-4 top-8 z-10 border border-[rgba(37,99,235,0.35)] bg-[rgba(37,99,235,0.14)] px-4 py-2 font-space text-xs uppercase tracking-[0.18em] text-[var(--secondary)] shadow-[0_0_30px_rgba(37,99,235,0.22)]">
              Karachi, Pakistan
            </div>
            <TiltedCard className="hero-panel overflow-hidden p-3 shadow-[0_0_0_2px_#2563eb,0_0_30px_#2563eb44]">
              <img
                src="/profile.png"
                alt={`${data.name} portrait`}
                className="-rotate-3 aspect-[4/5] w-full object-cover object-center"
              />
            </TiltedCard>
          </div>

          <div>
            <h2 id="about-heading" className="font-space text-3xl font-bold uppercase tracking-[0.1em] text-[var(--text)] sm:text-4xl">
              {data.name}
            </h2>
            <p className="mt-4 font-space text-sm uppercase tracking-[0.24em] text-[var(--primary)]">{data.title}</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">{data.about}</p>
            <blockquote className="mt-8 border-l-2 border-[var(--primary)] pl-5 text-xl leading-9 text-[var(--text)]">
              I turn product requirements and UI designs into maintainable applications with strong frontend architecture, dependable APIs, and practical database design.
            </blockquote>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {data.stats.map((stat) => (
                <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
              ))}
            </div>

            <div className="mt-12 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="glass-panel rounded-3xl p-6">
                <p className="font-space text-xs uppercase tracking-[0.24em] text-[var(--primary)]">Experience</p>
                <div className="mt-6 space-y-6">
                  {data.experience.map((item) => (
                    <article key={`${item.company}-${item.role}`} className="border-l border-[rgba(37,99,235,0.28)] pl-5">
                      <p className="font-space text-xs uppercase tracking-[0.2em] text-[var(--secondary)]">{item.period}</p>
                      <h3 className="mt-2 text-lg font-semibold text-[var(--text)]">{item.role}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{item.company}</p>
                      <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--muted)]">
                        {item.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-3xl p-6">
                <p className="font-space text-xs uppercase tracking-[0.24em] text-[var(--primary)]">Education</p>
                <h3 className="mt-6 text-lg font-semibold text-[var(--text)]">{data.education.degree}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{data.education.institution}</p>
                <p className="mt-3 font-space text-xs uppercase tracking-[0.2em] text-[var(--secondary)]">{data.education.period}</p>
                <p className="mt-8 font-space text-xs uppercase tracking-[0.24em] text-[var(--primary)]">Certifications</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {data.education.certifications.map((certification) => (
                    <span key={certification} className="project-tag">
                      {certification}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="contact"
              smooth
              offset={-80}
              duration={700}
              className="font-space mt-10 inline-flex items-center border border-[rgba(37,99,235,0.35)] bg-[rgba(37,99,235,0.14)] px-6 py-4 text-sm uppercase tracking-[0.2em] text-[var(--text)] shadow-[0_0_24px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[var(--primary)]"
            >
              Let's Talk -&gt;
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default memo(About);
