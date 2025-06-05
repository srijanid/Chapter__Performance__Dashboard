import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/database.js';
const app = express();
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import rateLimiter from "./middlewares/rateLimiter.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { createClient } from 'redis';

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

// Redis setup using redis package
const redisClient = createClient({
  legacyMode: true ,
  url: process.env.REDIS_URI,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect(); 

app.locals.redis = redisClient;


app.use("/api/v1/chapters", chapterRoutes);

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});