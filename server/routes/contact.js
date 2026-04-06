const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../config/contactModel");

/* ── Nodemailer Transporter ── */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ── POST /api/contact ── */
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    /* Basic validation */
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, msg: "All fields are required." });
    }

    /* Save to MongoDB */
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    /* Send email notification (non-blocking – don't fail the response) */
    transporter
      .sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: `[Portfolio] ${subject}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr/>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      })
      .catch((err) => console.error("⚠️  Email send failed:", err.message));

    res.status(201).json({ success: true, msg: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Contact route error:", err);
    res.status(500).json({ success: false, msg: "Server error. Please try again later." });
  }
});

module.exports = router;
