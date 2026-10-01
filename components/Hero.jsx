"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import BlurText from "./reactbits/BlurText";
import GradientText from "./reactbits/GradientText";
import SpaceBackdrop from "./SpaceBackdrop";
import AvatarHero from "./three/AvatarHero";

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
    <section id="home" className="hero-spot cosmic-hero relative overflow-hidden" aria-label="Hero section">
      <SpaceBackdrop />
      <div className="section-shell relative z-10">
        <div className="hero-cosmic-grid">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="hero-copy min-w-0">
            <motion.div variants={itemVariants} className="hero-availability">
              <span /> Available for projects <span className="availability-location">Karachi / Remote</span>
            </motion.div>
            <motion.p variants={itemVariants} className="hero-intro">Hi, I&apos;m {data.name}.</motion.p>
            <motion.h1 variants={itemVariants} className="cosmic-headline">
              <BlurText text="Web and mobile applications built with" stagger={0.035} />{" "}
              <GradientText colors={["#c4b5fd", "#93d9ed", "#c4b5fd"]}>clarity,</GradientText>{" "}
              <BlurText text="speed, and scale." delay={0.2} stagger={0.035} />
            </motion.h1>
            <motion.div variants={itemVariants} className="hero-role font-space">
              <span>{displayText || data.title}</span><span className="blink-cursor">|</span>
            </motion.div>
            <motion.p variants={itemVariants} className="hero-description">{data.bio}</motion.p>
            <motion.div variants={itemVariants} className="hero-actions">
              <ScrollLink to="projects" smooth offset={-80} duration={700} className="cosmic-button cosmic-button-primary">
                View Work <FiArrowUpRight size={18} />
              </ScrollLink>
              <a href={data.resumeUrl} target="_blank" rel="noreferrer" className="cosmic-button cosmic-button-secondary">Download CV</a>
            </motion.div>
          </motion.div>
          <div className="hero-avatar-column"><AvatarHero name={data.name} title={data.title} /></div>
        </div>
        <div className="hero-mission-footer">
          <p className="hero-kicker">React & Next.js web apps.<br />React Native & Expo mobile apps.<br />Production full-stack delivery.</p>
          <div className="hero-metrics">
            {data.stats.map((stat) => <div key={stat.label}><strong>{stat.value}{stat.suffix}</strong><span>{stat.label}</span></div>)}
          </div>
          <ScrollLink to="about" smooth offset={-80} duration={700} className="hero-scroll" aria-label="Scroll to about section"><FiArrowDownRight size={22} /></ScrollLink>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
