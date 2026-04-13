import React, { useState } from "react";
import axios from "axios";
import useReveal from "../hooks/useReveal";
import "./Section.css";
import "./Contact.css";

const API = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL.replace(/\/+$/, "")
  : "";

export default function Contact() {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      await axios.post(`${API}/api/contact`, form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrMsg(
        err.response?.data?.msg || err.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section id="contact" className="section">
      <div className={`reveal ${visible ? "visible" : ""}`} ref={ref}>
        <div className="section-header">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's talk</h2>
          <div className="section-divider" />
        </div>

        <div className="contact-wrapper">
          <p className="contact-intro">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>

          {status === "success" ? (
            <div className="contact-success">
              <div className="success-icon">✓</div>
              <h3>Message sent!</h3>
              <p>Thank you — I'll get back to you shortly.</p>
              <button className="btn-outline" onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message…"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {status === "error" && (
                <p className="contact-error">{errMsg}</p>
              )}

              <button
                type="submit"
                className="btn-primary contact-submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
