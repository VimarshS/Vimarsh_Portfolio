import React from "react";
import { FaTrophy, FaCertificate, FaCode } from "react-icons/fa";
import useReveal from "../hooks/useReveal";
import "./Section.css";
import "./Achievements.css";

const achievements = [
  {
    icon: <FaTrophy />,
    title: "Smart India Hackathon",
    detail: "Secured 3rd Rank at University Level, 2024",
  },
  {
    icon: <FaCertificate />,
    title: "Full Stack Internship",
    detail: "Completed Full Stack Web Development Internship at Unified Mentor",
  },
  {
    icon: <FaCode />,
    title: "Open Source Contributor",
    detail: "Contributed to open-source projects on GitHub",
  },
];

export default function Achievements() {
  const [ref, visible] = useReveal();

  return (
    <section id="achievements" className="section">
      <div className={`reveal-stagger ${visible ? "visible" : ""}`} ref={ref}>
        <div className="section-header reveal-child">
          <p className="section-label">Achievements</p>
          <h2 className="section-title">Milestones</h2>
          <div className="section-divider" />
        </div>

        <div className="achievements-grid">
          {achievements.map((a, i) => (
            <div key={i} className="achievement-card reveal-child">
              <div className="achievement-icon">{a.icon}</div>
              <h3 className="achievement-title">{a.title}</h3>
              <p className="achievement-detail">{a.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
