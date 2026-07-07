"use client";

import { memo } from "react";
import { Toaster } from "react-hot-toast";
import About from "@/components/About";
import BackToTop from "@/components/BackToTop";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import TechMarquee from "@/components/reactbits/TechMarquee";
import { portfolioData } from "@/data/portfolioData";

function Home() {
  return (
    <div className="editorial-shell blueprint-grid relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <ScrollProgress />
      <BackToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#0b1526",
            border: "1px solid rgba(37, 99, 235, 0.24)",
            boxShadow: "0 0 20px rgba(37, 99, 235, 0.2)",
          },
        }}
      />

      <Navbar initials={portfolioData.initials} />
      <div className="section-divider" />
      <main className="relative z-10">
        <Hero data={portfolioData} />
        <TechMarquee />
        <About data={portfolioData} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Testimonials testimonials={portfolioData.testimonials} />
        <Contact data={portfolioData} />
      </main>
      <Footer data={portfolioData} />
    </div>
  );
}

export default memo(Home);
