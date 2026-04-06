import React from "react";
import useReveal from "../hooks/useReveal";
import "./Section.css";
import "./About.css";

const education = [
  { degree: "B.Tech (CSE)", year: "2023–2027", institution: "Shri Ramswaroop Memorial University, Lucknow" },
  { degree: "ISC (Class XII)", year: "2023", institution: "St. Peters School, Raebareli",},
  { degree: "ICSE (Class X)", year: "2021", institution: "St. Peters School, Raebareli" },
];

export default function About() {
  const [ref, visible] = useReveal();

  return (
    <section id="about" className="section">
      <div className={`reveal ${visible ? "visible" : ""}`} ref={ref}>
        <div className="section-header">
          <p className="section-label">About Me</p>
          <h2 className="section-title">A little about myself</h2>
          <div className="section-divider" />
        </div>

        <div className="about-grid">
          <p className="about-bio">
            I'm a motivated Computer Science undergraduate with strong foundations in
            Data Structures, Algorithms, and Full Stack Web Development using the MERN
            stack. I enjoy turning ideas into responsive, well-architected applications
            and thrive in collaborative, agile environments. When I'm not coding, you'll
            find me exploring new frameworks or sharpening my skills on LeetCode.
          </p>

          <div className="about-edu">
            <h3 className="about-edu-title">Education</h3>
            <div className="edu-table">
              {education.map((e, i) => (
                <div key={i} className="edu-row">
                  <div className="edu-left">
                    <span className="edu-degree">{e.degree}</span>
                    <span className="edu-institution">{e.institution}</span>
                  </div>
                  <div className="edu-right">
                    <span className="edu-year">{e.year}</span>
                    <span className="edu-score">{e.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
