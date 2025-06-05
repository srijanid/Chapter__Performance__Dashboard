import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URI || 'redis://localhost:6380',
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

await redisClient.connect();

const rateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later",
});

export default rateLimiter;
