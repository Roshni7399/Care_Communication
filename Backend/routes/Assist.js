import express from "express";
import {
  addAssist,
  Assistlist,
  getAssistById,
  updateAssist,
  deleteAssist,
  allAssist,
} from "../controller/Assist";
import { List } from "../controller/Nurse";
import { upload } from "../middleware/uploadFile";

const router = express.Router();

router.post("/addAssist", upload.single("image"), addAssist);
router.post("/Assistlist", Assistlist);
router.get("/getAssistById/:id", getAssistById);
router.put("/updateAssist", updateAssist);
router.delete("/deleteAssist/:_id", deleteAssist);
router.get("/list", List);

// router.get("/allAssist",allAssist);

export default router;
