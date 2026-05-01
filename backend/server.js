import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import feedbackRoutes from "./routes/feedbackRoutes.js";
import malwareRoutes from "./routes/malwareRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/feedback", feedbackRoutes);
app.use("/api/malware", malwareRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
