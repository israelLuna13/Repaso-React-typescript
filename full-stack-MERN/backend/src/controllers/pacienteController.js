import Paciente from "../models/Paciente.js";
import mongoose from "mongoose";

import colors from 'colors'

export const addPaciente=async(req,res)=>{
    
    const paciente = new Paciente(req.body)
    paciente.veterinario =req.veterinario._id 
    
    try {
        const pacienteSaved = await paciente.save()
        res.json(pacienteSaved)

        
    } catch (error) {
        console.log(`======================`);
        console.log(colors.bgRed.black.bold(error.message));
        console.log(`======================`);
    }
}


export const getPacientes=async(req,res)=>{

   const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario)
   res.json(pacientes)

}

export const getPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }
    const paciente = await Paciente.findById(id);
    if (!paciente) {
      res.status(404).json({ msg: "Do not exist" });
    }
    if (paciente.veterinario._id.toString() !== req.veterinario.id.toString()) {
      res.json({ msg: "Error authenticate" });
      return;
    }
    res.json(paciente);
  } catch (error) {
    console.log(`======================`);
    console.log(colors.bgRed.black.bold(error.message));
    console.log(`======================`);
  }
};
export const updatePaciente = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }
    const paciente = await Paciente.findById(id);
    if(!paciente)
        {
            res.status(404).json({ msg: "Do not exist" });
            return
        }
    
    if (paciente.veterinario._id.toString() !== req.veterinario.id.toString()) {
      res.json({ msg: "Error authenticate" });
      return;
    }

    //update
    paciente.name = req.body.name || paciente.name;
    paciente.owner = req.body.owner || paciente.owner;
    paciente.email = req.body.email || paciente.email;
    paciente.symptoms = req.body.symptoms || paciente.symptoms;
    paciente.date = req.body.date || paciente.date;

    const pacienteUpdated = await paciente.save()
    res.json(pacienteUpdated)

  } catch (error) {
    console.log(`======================`);
    console.log(colors.bgRed.black.bold(error.message));
    console.log(`======================`);
  }
};
export const deletePaciente = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }
    const paciente = await Paciente.findById(id);
    
    if (!paciente) {
      res.status(404).json({ msg: "Do not exist" });
      return;
    }

    if (paciente.veterinario._id.toString() !== req.veterinario.id.toString()) {
      res.json({ msg: "Error authenticate" });
      return;
    }
    await paciente.deleteOne();
    res.json({ msg: "Deleted successfully" });
  } catch (error) {
    console.log(`======================`);
    console.log(colors.bgRed.black.bold(error.message));
    console.log(`======================`);
  }
};