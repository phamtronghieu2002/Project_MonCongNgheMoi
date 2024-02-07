import express from "express";
const router = express.Router();
import * as authControler from "..//controllers/authController";
import { veryfyUser } from "..//middlewares//auth";
router.post("/register", authControler.handleRegister);

router.post("/login", authControler.handleLogin);
router.post("/checkPhoneExit", authControler.handleCheckEixtsPhone);

router.get("/profile", veryfyUser, authControler.handeleGetProfile);
router.post("/refresh_token", authControler.handleFreshToken);
router.post("/logout", authControler.handleLogout);


export default router;
