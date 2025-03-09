import express from "express";
import { addPaciente, getPacientes,getPaciente, updatePaciente,deletePaciente } from "../controllers/pacienteController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").post(checkAuth, addPaciente).get(checkAuth, getPacientes);
router.route('/:id')
        .get(checkAuth,getPaciente)
        .put(checkAuth,updatePaciente)
        .delete(checkAuth,deletePaciente)
export default router;
