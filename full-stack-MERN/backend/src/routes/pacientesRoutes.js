import express from "express";
import {body} from 'express-validator'
import { addPaciente, getPacientes,getPaciente, updatePaciente,deletePaciente } from "../controllers/pacienteController.js";
import checkAuth from "../middleware/authMiddleware.js";
import { validateParamId, validateWithIdExistUser } from "../middleware/patient.js";
import { handleInputErrors } from "../middleware/validation.js";

const router = express.Router();

router.use(checkAuth)
router.param('id',validateParamId)
router.param('id',validateWithIdExistUser)
router.param('id',handleInputErrors)
//-------------------------------------
router.post("/",
        body("name").notEmpty().withMessage("The name is required"),
        body("owner").notEmpty().withMessage("The owner is required"),
        body("email").isEmail().withMessage("Incorrect email"),
        body("symptoms").notEmpty().withMessage("The symptoms is required"),
       handleInputErrors,addPaciente)
       
router.get("/",getPacientes)

router.get("/:id",getPaciente)
router.put("/:id",updatePaciente)
router.delete("/:id",deletePaciente)

export default router;
