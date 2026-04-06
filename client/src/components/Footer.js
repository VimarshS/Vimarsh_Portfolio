import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-socials">
          <a href="https://github.com/VimarshS" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/vimarsh-srivastava-a393b42a1" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Vimarsh Srivastava. Built with React & Node.js.
        </p>
      </div>
    </footer>
  );
}
