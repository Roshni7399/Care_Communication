import express from "express";
import {
  addNursingHome,
  getnursinghome,
  deleteNursingcompany,
  nursehomeLogin,
  nursinghomeUpdate,
} from "../controller/NursingHome";
import { List } from "../controller/Nurse";
import { upload } from "../middleware/uploadFile";

const router = express.Router();

router.post("/addNursingHome", upload.single("image"), addNursingHome);
router.post("/nursehomeLogin", nursehomeLogin);
router.post("/getnursinghome", getnursinghome);
router.delete("/deleteNursingcompany/:_id", deleteNursingcompany);
router.put("/ nursinghomeUpdate", nursinghomeUpdate);
router.get("/list", List);

export default router;
