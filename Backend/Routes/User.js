import express from "express";
import { CheckLoginUser, GetHeaderInfo, GetUser, forgotPassword, login, logout, register, resetPassword, updateUser, upload } from "../Controllers/User.js";

const router = express.Router();

router.post("/register",upload.single("image"), register);
router.post("/login",login);
router.get("/verify",CheckLoginUser);
router.post("/logout",logout);
router.get("/:id",GetUser);
router.put("/:id",updateUser);
router.get("/Profile/:id",GetHeaderInfo);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);
export default router;