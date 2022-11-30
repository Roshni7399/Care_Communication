import express from "express";
import {
  userSignup,
  userLogin,
  getUserDataById,
  updateUser,
} from "../controller/User";
import { verifyToken } from "../middleware/verifyToken";
import { upload } from "../middleware/uploadFile";

const router = express.Router();

router.post("/userSignup", userSignup);
router.post("/userLogin", userLogin);
router.get("/getUserDataById", verifyToken, getUserDataById);
router.put("/updateUser", upload.single("image"), updateUser);

export default router;
