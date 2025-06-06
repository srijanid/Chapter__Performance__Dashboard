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
import redisClient from './redisClient.js';

connectDB();

await redisClient.connect();
app.locals.redis = redisClient;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(rateLimiter(redisClient));
app.use(errorHandler);

const PORT = process.env.PORT ||3000;

app.get('/', (req, res) => {
  res.send('API is running');
});


app.use("/api/v1/chapters", chapterRoutes);

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});