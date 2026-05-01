import express from "express";
import db from "../config/db.js";

const router = express.Router();

/* POST feedback */
router.post("/", (req, res) => {
  const { toolUsed, message, rating } = req.body;

  if (!toolUsed || !message) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const sql =
    "INSERT INTO feedback (tool_used, message, rating) VALUES (?, ?, ?)";

  db.query(sql, [toolUsed, message, rating || null], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Feedback saved" });
  });
});

/* GET feedback */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM feedback ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
router.get("/analytics", (req, res) => {
  const sql = `
    SELECT 
      tool_used,
      COUNT(*) as total
    FROM feedback
    GROUP BY tool_used
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});
router.get("/average-rating", (req, res) => {
  const sql = `
    SELECT AVG(rating) as avg_rating
    FROM feedback
    WHERE rating IS NOT NULL
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results[0]);
  });
});
});

export default router;
