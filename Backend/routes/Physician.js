import express from "express";
import {
  deletephysician,
  getPhysicianList,
  physicianLogin,
  physicianSignup,
  updatePhysician,
  Count,
  getPhyDataById,
} from "../controller/Physician";
import { List } from "../controller/Nurse";
import { upload } from "../middleware/uploadFile";

const router = express.Router();

router.post("/physicianSignup", upload.single("image"), physicianSignup);
router.post("/physicianLogin", physicianLogin);
router.get("/getPhyDataById", getPhyDataById);
router.post("/getPhysicianList", getPhysicianList);
router.put("/updatephysician", updatePhysician);
router.delete("/deletephysician/:id", deletephysician);
router.get("/count", Count);
router.get("/list", List);

export default router;
