import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectToDatabase } from "./db/connection.js";

config();

const __dirname = path.resolve();
const app = express();

// Middleware setup
app.use(
  cors({
    origin: "https://kasubay-ai.vercel.app", // Allow only this origin
    credentials: true, // Allow cookies and credentials if needed
  })
);

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes setup
app.use("/api/v1", appRouter);

// Database connection and server listener
const PORT = process.env.PORT || 5001;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT} and connected to the database 👌`)
    );
  })
  .catch((error) => console.error(error));