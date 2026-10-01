"use client";

import { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
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
    <div ref={ref} className="glass-panel about-stat">
      <div className="font-space text-3xl font-bold text-[var(--primary)]">
        {count}
        {suffix}
      </div>
      <p className="about-stat-label">{label}</p>
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
        <p className="section-label">{"// ABOUT_ME"}</p>
        <div className="about-overview">
          <div className="about-portrait-column">
            <TiltedCard className="hero-panel about-portrait" maxTilt={5}>
              <Image
                src="/profile.png"
                alt={`${data.name} portrait`}
                width={1254}
                height={1254}
                sizes="(max-width: 639px) 320px, 400px"
                className="about-portrait-image"
              />
              <span className="about-location"><FiMapPin aria-hidden="true" />{data.contact.location}</span>
            </TiltedCard>
          </div>

          <div className="about-copy">
            <h2 id="about-heading">
              {data.name}
            </h2>
            <p className="about-role">{data.title}</p>
            <p className="about-bio">{data.about}</p>
            <blockquote className="about-quote">
              {data.highlight}
            </blockquote>
            <Link
              to="contact"
              href="#contact"
              smooth
              offset={-80}
              duration={700}
              className="cosmic-button cosmic-button-secondary about-contact"
            >
              Let&apos;s talk <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="about-stats">
          {data.stats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>

        <div className="about-background">
          <section className="glass-panel about-experience" aria-labelledby="about-experience-heading">
            <h3 id="about-experience-heading" className="about-card-heading">Experience</h3>
            <div className="about-experience-grid">
              {data.experience.map((item) => (
                <article key={`${item.company}-${item.role}`} className="about-job">
                  <p className="about-period">{item.period}</p>
                  <h4 className="mt-3 text-lg font-semibold text-[var(--text)]">{item.role}</h4>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.company}</p>
                  <ul className="about-highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="glass-panel about-education" aria-labelledby="about-education-heading">
            <div>
              <h3 id="about-education-heading" className="about-card-heading">Education</h3>
              <h4 className="mt-6 text-lg font-semibold text-[var(--text)]">{data.education.degree}</h4>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{data.education.institution}</p>
              <p className="about-period mt-4">{data.education.period}</p>
            </div>
            <div className="about-certifications">
              <h3 className="about-card-heading">Certifications</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {data.education.certifications.map((certification) => (
                  <span key={certification} className="project-tag">
                    {certification}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.section>
  );
}

export default memo(About);
