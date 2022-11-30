import express from "express";
import {
  addnurse,
  nurseLogin,
  getnurshe,
  nurseUpdate,
  nurseDelete,
  List,
  getNurseDataById,
} from "../controller/Nurse";
import { upload } from "../middleware/uploadFile";

const router = express.Router();

router.post("/addnurse", upload.single("image"), addnurse);
router.post("/nurseLogin", nurseLogin);
router.post("/getnurshe", getnurshe);
router.put("/nurseUpdate", nurseUpdate);
router.delete("/nurseDelete/:id", nurseDelete);
router.get("/list", List);
router.get("/getNurseDataById/:id", getNurseDataById);

export default router;
