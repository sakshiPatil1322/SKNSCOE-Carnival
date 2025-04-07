// controllers/noticeController.js
import Notice from "../model/notice.js";
import User from "../model/user.js";
import nodemailer from "nodemailer";
import Registration from "../model/registration.js";

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
      fileUrl: file.path,
      fileType,
      cloudinaryId: file.filename,
    });

    await newNotice.save();

    // Send Emails after saving
    sendEmailsToUsers(newNotice);

    res.status(201).json({ message: "Notice uploaded successfully", notice: newNotice });
  } catch (err) {
    console.error("Notice upload failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Only one definition here!
const sendEmailsToUsers = async (notice) => {
  try {
    const approvedUsers = await User.find({ status: "approved" });

    const registrations = await Registration.find({});
    const participantEmails = [];

    registrations.forEach((reg) => {
      if (reg.type === "solo" && reg.formData?.email) {
        participantEmails.push(reg.formData.email);
      } else if (reg.type === "group" && reg.participants.length > 0) {
        reg.participants.forEach((p) => {
          if (p.email) participantEmails.push(p.email);
        });
      }
    });

    // Combine and remove duplicates
    const allEmails = [
      ...approvedUsers.map((user) => user.email),
      ...participantEmails,
    ];
    const uniqueEmails = [...new Set(allEmails)];

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await Promise.all(
      uniqueEmails.map((email) => {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "📢 New Notice Uploaded",
          text: `Dear User,

A new notice has been uploaded on the portal.

📌 Description: ${notice.description}
📁 File Type: ${notice.fileType.toUpperCase()}
🔗 File: ${notice.fileUrl}

Please log in to view/download the notice:
http://localhost:5173/

Regards,
Event Management Team`,
        };

        return transporter.sendMail(mailOptions);
      })
    );

    console.log("✅ Notice emails sent to approved users and all participants.");
  } catch (error) {
    console.error("❌ Failed to send notice emails:", error.message);
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
