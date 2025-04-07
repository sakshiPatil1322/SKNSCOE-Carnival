import express from "express";
import upload from "../middleware/upload.js";
import { uploadNoticeController, getAllNoticesController } from "../controller/notice.js";
import {requireSignIn} from "../middleware/authMiddleware.js"; // Assuming this protects the route

const router = express.Router();

router.post("/upload", requireSignIn, upload.single("file"), uploadNoticeController);
router.get("/all", getAllNoticesController);

export default router;
