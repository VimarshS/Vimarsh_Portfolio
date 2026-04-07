import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaLink } from "react-icons/fa";
import useReveal from "../hooks/useReveal";
import "./Section.css";
import "./Projects.css";

const projects = [
  {
    title: "Real-Time Chat App",
    description: "Fully interactive chat platform with instant messaging powered by WebSockets, room-based conversations, and online status indicators.",
    tags: ["React.js", "Node.js", "Socket.io", "MongoDB", "CSS3"],
    github: "https://github.com/VimarshS",
    projectUrl: "https://chat-app-pink-eta-53.vercel.app/",
    live: "",
  },
  {
    title: "Food Delivery App",
    description: "Secure food-ordering platform with a product catalogue, shopping cart, Stripe payment integration, and order confirmation flow.",
    tags: ["React.js", "Node.js", "MongoDB", "Stripe", "Express"],
    github: "https://github.com/VimarshS",
    projectUrl: "https://food-delivery-demo.vercel.app",
    live: "",
  },
  {
    title: "Text-Tools",
    description: "A lightweight text analysis utility that provides word/character count, case conversion, formatting options, and readability statistics.",
    tags: ["React.js", "HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/VimarshS",
    projectUrl: "https://text-tools-vimarsh.vercel.app/",
    live: "",
  },
  {
  title: "ExamNotesAI",
  description: "AI-powered platform for generating, organizing, and accessing exam notes efficiently to support quick learning and revision.",
  tags: ["React.js", "Node.js", "Express.js", "MongoDB", "OpenAI API"],
  github: "https://github.com/VimarshS/ExamNotesAI.git",
  projectUrl: "https://examnotes-ai.vercel.app", // Replace with your actual deployed URL
  live: "",
},
{
    title: "Portfolio Website",
    description: "Responsive personal portfolio built from scratch — the very site you're viewing now. Showcases projects, skills, and a working contact form.",
    tags: ["React.js", "Node.js", "MongoDB", "Express", "CSS3"],
    github: "https://github.com/VimarshS",
    projectUrl: "https://vimarsh-portfolio.vercel.app",
    live: "",
  },

];

export default function Projects() {
  const [ref, visible] = useReveal();
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" className="section">
      <div className={`reveal-stagger ${visible ? "visible" : ""}`} ref={ref}>
        <div className="section-header reveal-child">
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I've built</h2>
          <div className="section-divider" />
        </div>

        <div className="projects-grid">
          {projects.slice(0, showAll ? projects.length : 4).map((p, i) => (
            <div key={i} className="project-card reveal-child">
              <div className="project-number">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.description}</p>
              <div className="project-tags">
                {p.tags.map((t, ti) => (
                  <span key={ti} className="tag">{t}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={p.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
                {p.projectUrl && (
                  <a href={p.projectUrl} target="_blank" rel="noreferrer" aria-label="Project">
                    <FaLink />
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" aria-label="Live">
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="view-more-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "View Less" : "View More"}
        </button>
      </div>
    </section>
  );
}
