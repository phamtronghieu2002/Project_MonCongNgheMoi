import express from "express";
const router = express.Router();
import * as authControler from "..//controllers/authController";
router.post("/register", authControler.handleRegister);

router.post("/login", authControler.handleLogin);

export default router;
