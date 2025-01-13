import express from "express";
import {config} from 'dotenv';
import morgan from 'morgan';
import appRouter from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from "path";
config();
const __dirname = path.resolve();
const app = express();

app.use(cors({
    origin: 'https://kasubay-ai.vercel.app', // Allow only this origin
    credentials: true, // Allow cookies and credentials if needed
  }));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));



app.use("/api/v1",appRouter);

export default app;