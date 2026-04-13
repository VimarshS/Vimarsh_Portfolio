const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ── */
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.options("*", cors());
app.use(express.json());

/* ── MongoDB Connection ── */
const mongoUri = process.env.MONGO_URI;
const mongoEnabled = Boolean(mongoUri);

async function connectMongo() {
  if (!mongoEnabled) {
    console.warn("⚠️ MONGO_URI is not configured. Contact messages will not be saved to MongoDB.");
    return;
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

connectMongo();

/* ── Routes ── */
app.use("/api/contact", contactRoutes);

/* ── Health check ── */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/* ── Vercel deployment ── */
module.exports = app;

// Only start server if not in Vercel environment
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
