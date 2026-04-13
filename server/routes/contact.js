const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../config/contactModel");

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  RECIPIENT_EMAIL,
} = process.env;

const emailEnabled = Boolean(
  SMTP_HOST &&
  SMTP_PORT &&
  SMTP_USER &&
  SMTP_PASS &&
  RECIPIENT_EMAIL
);

/* ── Nodemailer Transporter ── */
const transporter = emailEnabled
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null;

/* ── POST /api/contact ── */
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    /* Basic validation */
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, msg: "All fields are required." });
    }

    const shouldSave = Boolean(process.env.MONGO_URI);
    const shouldEmail = Boolean(transporter);

    if (!shouldSave && !shouldEmail) {
      return res.status(500).json({
        success: false,
        msg: "Contact backend is not configured. Please set MONGO_URI or SMTP environment variables.",
      });
    }

    if (shouldSave) {
      const contact = new Contact({ name, email, subject, message });
      await contact.save();
    } else {
      console.warn("⚠️ Skipping MongoDB save because MONGO_URI is not configured.");
    }

    if (shouldEmail) {
      transporter
        .sendMail({
          from: `"${name}" <${SMTP_USER}>`,
          to: RECIPIENT_EMAIL,
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
    } else {
      console.warn("⚠️ Skipping email notification because SMTP is not configured.");
    }

    res.status(201).json({ success: true, msg: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Contact route error:", err);
    res.status(500).json({ success: false, msg: "Server error. Please try again later." });
  }
});

module.exports = router;
