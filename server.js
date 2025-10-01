// ─── Imports ────────────────────────────────────────────────
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// ─── App Config ─────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ─────────────────────────────────────────────
app.use(cors());                 // Enable CORS for all origins
app.use(bodyParser.json());      // Parse JSON request bodies

// ─── Routes ────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.send("✅ SkillLink Backend is running!");
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from SkillLink Express backend 👋" });
});

// ─── 404 Handler ───────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

// ─── Server Start ──────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
