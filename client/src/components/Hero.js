import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Hero.css";

const ROLES = [
  "Full Stack Developer",
  "MERN Stack Enthusiast",
  "React Developer",
  "Problem Solver",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIndex];

    if (!deleting) {
      // Typing
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
        return () => clearTimeout(t);
      }
      // Pause before delete
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    } else {
      // Deleting
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      }
      // Move to next role
      setRoleIndex((i) => (i + 1) % ROLES.length);
      setDeleting(false);
    }
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="hero" className="hero">
      {/* Decorative orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="hero-container">
        <div className="hero-photo">
          {/* <div className="photo-placeholder">
            <span>Your Photo Here</span>
            <p>Replace with your image</p>
          </div> */}
          <img src="/profile1.jpeg" alt="Vimarsh" className="profile-img" />
        </div>

        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">Vimarsh Srivastava</h1>

        <div className="hero-role-wrap">
          <span className="hero-role">{displayed}</span>
          <span className="cursor" />
        </div>

        <p className="hero-sub">
          Building responsive, full-stack web applications with modern technologies.
          Crafting clean code and intuitive user experiences.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
        </div>

        <div className="hero-socials">
          <a href="https://github.com/VimarshS" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/vimarsh-srivastava-a393b42a1" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
