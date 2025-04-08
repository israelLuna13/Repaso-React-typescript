import {param} from 'express-validator'
import Paciente from '../models/Paciente.js';
import mongoose from "mongoose";

export const validateWithIdExistUser= async(req,res,next)=>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid ID format" });
      }
    try {
      const patient = await Paciente.findById(id);
      if (!patient) {
        res.status(404).json({ msg: "Do not exist" });
        return
      }
      if (patient.veterinario._id.toString() !== req.veterinario.id.toString()) {
        res.json({ msg: "Error authenticate" });
        return;
      }
      req.patient = patient
      next()
      
    } catch (error) {
    //   console.log(`======================`);
    //   console.log(colors.bgRed.black.bold(error.message));
    //   console.log(`======================`);
        res.status(500).json({error:'There is error'})
    }
}

export const validateParamId = async(req,res,next)=>{
    await param("id").isMongoId().withMessage("Incorrect id").run(req)
    next()
}