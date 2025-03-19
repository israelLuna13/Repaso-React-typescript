import express from "express";
import {
  register,
  profile,
  confirmation,
  login,
  forgotPassword,
  CheckToken,
  newPassword,
  updateProfile,
  updatePassword
} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

//publi area
router.post("/register", register);
router.post("/login", login);
router.get("/confirmation/:token", confirmation);
router.post("/forgot-password",forgotPassword)
router.get("/forgot-password/:token",CheckToken)
router.post("/forgot-password/:token",newPassword)

//
router.get("/profile", checkAuth, profile);
router.put("/profile/:id",checkAuth,updateProfile)
router.put("/update-password",checkAuth,updatePassword)

export default router;
