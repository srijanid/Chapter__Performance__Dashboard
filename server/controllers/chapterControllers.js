import Chapter from "../models/Chapter.js";
import fs from "fs";
import { getCache, setCache, deleteKeysByPattern } from "../utils/cache.js";

export const getChapters = async (req, res) => {
  try {
    const redisClient = req.app.locals.redis;
    const key = `chapters:${JSON.stringify(req.query)}`;

    const cached = await getCache(redisClient, key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const { class: classFilter, unit, status, weakChapters, subject, page = 1, limit = 10 } = req.query;

      const filter = {};
      if (classFilter) filter.class = classFilter;
      if (unit) filter.unit = unit;
      if (status) filter.status = status;
      if (subject) filter.subject = subject;
      if (weakChapters !== undefined)
        filter.weakChapters = weakChapters === "true";

      const total = await Chapter.countDocuments(filter);
      const chapters = await Chapter.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const result = { total, page: Number(page), limit: Number(limit), chapters };
    
    await redisClient.set(key, JSON.stringify(result), "EX", 3600); // 1 hour
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const uploadChapters = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const data = JSON.parse(fs.readFileSync(req.file.path, "utf-8"));
    const failed = [];
    let successCount = 0;

    for (const chapter of data) {
      try {
        const exists = await Chapter.findOne({
          class: chapter.class,
          unit: chapter.unit,
          subject: chapter.subject,
          chapter: chapter.chapter,
        });
        if (exists) {
          failed.push({ chapter, error: "Duplicate entry" });
        } else {
          const newChapter = new Chapter(chapter);
          await newChapter.save();
          successCount++;
        }
      } catch (err) {
        failed.push({ chapter, error: err.message });
      }
    }

    // Invalidate Redis chapter cache
    const redisClient = req.app.locals.redis;
    const keys = await deleteKeysByPattern(redisClient, "chapters:*");
    
    res.json({
      message: "Upload complete",
      successCount,
      failedCount: failed.length,
      failed,
      totalCount: data.length,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid JSON file", error: err.message });
  }
};


// DELETE all chapters (admin-only route)
export const deleteAllChapters = async (req, res) => {
  try {
    const result = await Chapter.deleteMany({});
    res.json({ message: "All chapters deleted", deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete chapters", error: error.message });
  }
};