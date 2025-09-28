import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import companyRouter from "./routes/companyRoute.js";

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

// Routes
app.use("/auth", userRouter);
app.use("/admin", adminRouter);
app.use("/company", companyRouter);

app.get("/", (_, res) => {
  res.send("Server is up and running!");
});

export default app;
