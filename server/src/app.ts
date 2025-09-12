import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

// Global middlewares
app.use(express.json());
app.use(limiter);
app.use(cors());
app.use(errorHandler);

app.get("/", (_, res) => {
  res.send("Server is up and running!");
});

export default app;
