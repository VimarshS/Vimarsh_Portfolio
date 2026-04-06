import React from "react";
import useReveal from "../hooks/useReveal";
import "./Section.css";
import "./Experience.css";

const experience = [
  {
    role: "Full Stack Web Development Intern",
    company: "Unified Mentor",
    duration: "3 Months",
    bullets: [
      "Worked on full-stack projects using React.js, Node.js, and MongoDB.",
      "Designed responsive UIs and developed RESTful APIs.",
      "Implemented secure authentication flows (JWT / session-based).",
      "Collaborated in an agile setup to deliver modules efficiently.",
    ],
  },
];

export default function Experience() {
  const [ref, visible] = useReveal();

  return (
    <section id="experience" className="section">
      <div className={`reveal ${visible ? "visible" : ""}`} ref={ref}>
        <div className="section-header">
          <p className="section-label">Experience</p>
          <h2 className="section-title">Work history</h2>
          <div className="section-divider" />
        </div>

        <div className="experience-timeline">
          {experience.map((exp, i) => (
            <div key={i} className="exp-card">
              {/* Vertical connector */}
              <div className="exp-connector">
                <div className="exp-dot" />
                <div className="exp-line" />
              </div>

              <div className="exp-content">
                <div className="exp-header">
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-duration">{exp.duration}</span>
                </div>
                <span className="exp-company">{exp.company}</span>
                <ul className="exp-bullets">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
