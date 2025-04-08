import express from "express";
import {body,param} from "express-validator"
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
import { handleInputErrors } from "../middleware/validation.js";
import { vaidateWithEmailExitUser, validateInputToken, validateWithTokenExistUser } from "../middleware/vet.js";

const router = express.Router();

//publi area
router.post(
  "/register",
  body("name").notEmpty().withMessage("The name is required"),
  body("email").isEmail().withMessage("Incorrect email"),
  body("password")
    .notEmpty()
    .withMessage("The password is required")
    .isLength({ min: 6 })
    .withMessage("The password most has minium 8 characters"),
  handleInputErrors,
  register
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Incorrect email"),
  body("password").notEmpty().withMessage("The password is required"),
  handleInputErrors,
  vaidateWithEmailExitUser,
  login
);

router.get("/confirmation/:token",
  validateInputToken,
  handleInputErrors,
  validateWithTokenExistUser,
  confirmation);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Incorrect email"),
  handleInputErrors,
  vaidateWithEmailExitUser,
  forgotPassword
);


router.get("/forgot-password/:token",
validateInputToken,
handleInputErrors,
validateWithTokenExistUser,CheckToken)

router.post(
  "/forgot-password/:token",
  param("token").notEmpty().withMessage("Incorrect token"),
  body("password")
    .notEmpty()
    .withMessage("The password is required")
    .isLength({ min: 6 })
    .withMessage("The password most has minium 8 characters"),
  handleInputErrors,
  validateWithTokenExistUser,
  newPassword
);

//
router.get("/profile", checkAuth, profile);
router.put("/profile/:id",checkAuth,updateProfile)
router.put("/update-password",checkAuth,updatePassword)

export default router;
