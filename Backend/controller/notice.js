// controllers/noticeController.js
import Notice from "../model/notice.js";

export const uploadNoticeController = async (req, res) => {
  try {
    const { description } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const fileType = file.mimetype.includes("pdf") ? "pdf" : "image";

    const newNotice = new Notice({
      uploadedBy: req.user._id,
      role: req.user.role,
      description,
      fileUrl: file.path, // Cloudinary URL
      fileType,
      cloudinaryId: file.filename, // helpful if you want to delete later
    });

    await newNotice.save();
    res.status(201).json({ message: "Notice uploaded successfully", notice: newNotice });
  } catch (err) {
    console.error("Notice upload failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllNoticesController = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (err) {
    console.error("Failed to get notices:", err);
    res.status(500).json({ message: "Server error" });
  }
};
