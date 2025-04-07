import express from "express";
import {ongoingEvents} from "../controller/student.js"
import { registerEvent } from "../controller/student.js";


const router = express.Router();

// GET Ongoing Events (where registration is open)
router.get("/ongoing", ongoingEvents);
router.post("/registerEvent", registerEvent);

export default router;
