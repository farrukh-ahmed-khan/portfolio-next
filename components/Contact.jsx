"use client";

import { memo, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FiGithub, FiGlobe, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { SiUpwork } from "react-icons/si";
import SpotlightCard from "./reactbits/SpotlightCard";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Contact({ data }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = "Enter a valid email.";
    if (!formData.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!formData.message.trim()) nextErrors.message = "Message is required.";
    if (formData.message.trim() && formData.message.trim().length < 20) nextErrors.message = "Message should be at least 20 characters.";
    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1200));
    toast.success("Message sent! *");
    setFormData(initialForm);
    setErrors({});
    setLoading(false);
  };

  const socialLinks = [
    { label: "GitHub", href: data.contact.socials.github, icon: FiGithub },
    { label: "LinkedIn", href: data.contact.socials.linkedin, icon: FiLinkedin },
    { label: "Upwork", href: data.contact.socials.upwork, icon: SiUpwork },
    { label: "Portfolio", href: data.contact.socials.portfolio, icon: FiGlobe },
  ];

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75 }}
      className="py-24 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="section-shell">
        <div className="contact-shell">
          <div>
            <p className="section-label">// CONTACT</p>
            <span className="hero-index mb-6 block">05</span>
            <h2 id="contact-heading" className="max-w-3xl text-3xl font-black tracking-[-0.05em] text-[var(--text)] sm:text-6xl">
              Let's build reliable web products with clean execution.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              Reach out for React, Next.js, Node.js, Laravel, API integration, dashboard, marketplace, ecommerce, or custom full stack web application work.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <SpotlightCard className="contact-info-card">
                <FiMail size={20} className="text-[var(--primary)]" />
                <p className="font-space mt-4 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Email</p>
                <a href={`mailto:${data.contact.email}`} className="contact-value">
                  {data.contact.email}
                </a>
              </SpotlightCard>

              <SpotlightCard className="contact-info-card">
                <FiPhone size={20} className="text-[var(--primary)]" />
                <p className="font-space mt-4 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Phone</p>
                <a href={`tel:${data.contact.phone}`} className="contact-value">
                  {data.contact.phone}
                </a>
              </SpotlightCard>

              <SpotlightCard className="contact-info-card">
                <FiMapPin size={20} className="text-[var(--primary)]" />
                <p className="font-space mt-4 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Location</p>
                <p className="contact-value">{data.contact.location}</p>
              </SpotlightCard>
            </div>

            <div className="mt-8 flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`Visit ${social.label}`} className="project-icon-btn">
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="contact-form-shell">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block font-space text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Name
                </label>
                <input id="name" name="name" value={formData.name} onChange={handleChange} className={`input-shell ${errors.name ? "input-error" : ""}`} placeholder="Your name" />
                {errors.name ? <p className="mt-2 text-sm text-red-400">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block font-space text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Email
                </label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={`input-shell ${errors.email ? "input-error" : ""}`} placeholder="you@example.com" />
                {errors.email ? <p className="mt-2 text-sm text-red-400">{errors.email}</p> : null}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="mb-2 block font-space text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Subject
              </label>
              <input id="subject" name="subject" value={formData.subject} onChange={handleChange} className={`input-shell ${errors.subject ? "input-error" : ""}`} placeholder="Project inquiry" />
              {errors.subject ? <p className="mt-2 text-sm text-red-400">{errors.subject}</p> : null}
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block font-space text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className={`input-shell resize-none ${errors.message ? "input-error" : ""}`}
                placeholder="Tell me about the application, API, integration, or dashboard you want to build."
              />
              {errors.message ? <p className="mt-2 text-sm text-red-400">{errors.message}</p> : null}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="font-space mt-6 inline-flex w-full items-center justify-center gap-3 rounded-none bg-[var(--primary)] px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[var(--bg)] shadow-[0_0_24px_rgba(37,99,235,0.24)] transition duration-300 hover:-translate-y-1 disabled:translate-y-0 disabled:opacity-80"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-[rgba(244,247,251,0.28)] border-t-[var(--bg)]" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
}

export default memo(Contact);
