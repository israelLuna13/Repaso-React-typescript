import colors from "colors";
import {body,param,validationResult} from 'express-validator'
import Veterinario from "../models/Veterinaria.js";


export const validateInputToken = async(req,res,next)=>{
    await param("token").notEmpty().withMessage('Incorrect token').run(req)
    next()
}
export const vaidateWithEmailExitUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userExist = await Veterinario.findOne({ email });
    if (!userExist) {
      const error = new Error("User do not exist");
      res.status(404).json({ msg: error.message });
      return;
    }
    req.userExist = userExist
    next()
  } catch (error) {
    // console.log(`======================`);

    // console.log(colors.bgRed.black.bold(error.message));
    // console.log(`======================`);
    res.status(500).json({ error: "There is error" });
  }
};

export const validateWithTokenExistUser=async(req,res,next)=>{
    const { token } = req.params;

    try {
        const userToken = await Veterinario.findOne({ token });

        if (!userToken) {
          const error = new Error("Invalid token");
          res.status(404).json({ msg: error.message });
          return;
        }
        req.userToken = userToken
        next()
        
    } catch (error) {
         // console.log(`======================`);

    // console.log(colors.bgRed.black.bold(error.message));
    // console.log(`======================`);
    res.status(500).json({ error: "There is error" });
    }
}