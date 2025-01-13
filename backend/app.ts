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

//middlewares
//app.use(cors({origin: "https://kasubay-ai.vercel.app", credentials: true}));
// Enable CORS for your client URL
app.use(cors({
    origin: 'https://kasubay-ai.vercel.app', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies and credentials if needed
  }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://kasubay-ai.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  


app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


//remove in prod
//app.use(morgan("dev"));

app.use("/api/v1",appRouter);

export default app;