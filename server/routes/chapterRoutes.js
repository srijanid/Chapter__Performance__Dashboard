import express from "express";
import multer from "multer";
import { getChapters, getChapterById, uploadChapters,deleteAllChapters } from "../controllers/chapterControllers.js";
import { adminAuth } from "../middlewares/auth.js";

const router = express.Router();
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/json") {
      return cb(new Error("Only JSON files are allowed"));
    }
    cb(null, true);
  },
});

router.get("/", getChapters);
router.get("/:id", getChapterById);
router.post("/", adminAuth, upload.single("file"), uploadChapters);
router.delete("/", adminAuth, deleteAllChapters);

export default router;