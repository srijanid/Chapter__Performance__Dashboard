import { createClient } from 'redis';

const redisClient = createClient({
  legacyMode: true,
  url: process.env.REDIS_URI,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

export default redisClient;
