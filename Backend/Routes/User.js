import express from "express";
import { CheckLoginUser, login, logout, register, upload } from "../Controllers/User.js";

const router = express.Router();

router.post("/register",upload.single("image"), register);
router.post("/login",login);
router.get("/verify",CheckLoginUser);
router.post("/logout",logout);

export default router;