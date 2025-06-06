
export const getCache = async (client, key) => {
  try {
    const data = await client.get(key);
    if (data) {
      console.log("Cache hit:", key);
      return JSON.parse(data);
    }
    console.log("Cache miss:", key);
    return null;
  } catch (err) {
    console.warn("Redis get error:", err.message);
    return null;
  }
};

export const setCache = async (client, key, value, ttl = 3600) => {
  try {
    await client.set(key, JSON.stringify(value), "EX", ttl);
  } catch (err) {
    console.warn("Redis set error:", err.message);
  }
};

export const deleteKeysByPattern = async (client, pattern) => {
  try {
    const keys = [];
    for await (const key of client.scanIterator({ MATCH: pattern })) {
      keys.push(key);
    }
    if (keys.length > 0) {
      await client.del(keys);
      console.log(`Deleted ${keys.length} cache keys`);
    }
  } catch (err) {
    console.warn("Redis delete error:", err.message);
  }
};

