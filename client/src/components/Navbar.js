import React, { useState, useEffect } from "react";
import "./Navbar.css";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("light", theme === "light");
    html.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="#hero" className="nav-logo">
        <span className="logo-v">V</span>
        <span className="logo-text">Vimarsh</span>
      </a>

      {/* Desktop links */}
      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <button
          className="theme-toggle-btn"
          onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          aria-label="Toggle light/dark mode"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <a
          className="resume-btn"
          href="/resume.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
      </div>

      {/* Hamburger */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <button
          className="theme-toggle-btn"
          onClick={() => {
            setTheme((current) => (current === "dark" ? "light" : "dark"));
            setMenuOpen(false);
          }}
          aria-label="Toggle light/dark mode"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <a
          className="resume-btn"
          href="/resume.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
