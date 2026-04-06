import React from "react";
import useReveal from "../hooks/useReveal";
import "./Section.css";
import "./Skills.css";

const categories = [
  {
    label: "Languages & Core",
    items: [
      { name: "JavaScript (ES6+)", level: 85 },
      { name: "Java", level: 70 },
      { name: "Python", level: 55 },
      { name: "C", level: 55},
    ],
  },
  {
    label: "Web & Stack",
    items: [
      { name: "React.js", level: 88 },
      { name: "Node.js / Express", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "HTML5 / CSS3", level: 90 },
    ],
  },
  {
    label: "Tools & Platforms",
    items: [
      { name: "Git / GitHub", level: 82 },
      { name: "Postman", level: 75 },
      { name: "VS Code", level: 90 },
      { name: "Vercel", level: 70 },
    ],
  },
];

export default function Skills() {
  const [ref, visible] = useReveal();

  return (
    <section id="skills" className="section">
      <div className={`reveal ${visible ? "visible" : ""}`} ref={ref}>
        <div className="section-header">
          <p className="section-label">Skills</p>
          <h2 className="section-title">What I work with</h2>
          <div className="section-divider" />
        </div>

        <div className="skills-grid">
          {categories.map((cat, ci) => (
            <div key={ci} className="skills-category">
              <h3 className="skills-cat-title">{cat.label}</h3>
              <div className="skills-list">
                {cat.items.map((skill, si) => (
                  <div key={si} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: visible ? `${skill.level}%` : "0%",
                          transitionDelay: `${(ci * 4 + si) * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
