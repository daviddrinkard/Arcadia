import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "arcadia-api" });
});

app.listen(PORT, () => {
  console.log(`[arcadia-api] listening on http://localhost:${PORT}`);
});
