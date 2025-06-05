import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/database.js';
const app = express();
dotenv.config();
import Redis from "ioredis";
import cors from "cors";
import morgan from "morgan";
import rateLimiter from "./middlewares/rateLimiter.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(rateLimiter);
app.use(errorHandler);

const PORT = process.env.PORT ||3000;

app.get('/', (req, res) => {
  res.send('API is running');
});

const redisClient = process.env.REDIS_URI
  ? new Redis(process.env.REDIS_URI)
  : new Redis(6380, 'localhost');
app.locals.redis = redisClient;


app.use("/api/v1/chapters", chapterRoutes);

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});