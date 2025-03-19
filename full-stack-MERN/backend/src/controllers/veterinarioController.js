import Veterinario from "../models/Veterinaria.js";
import { generateJWT } from "../helpers/generateJWT.js";
import emailRegister from "../helpers/emailRegister.js";
import colors from "colors";
import generateId from "../helpers/generateId.js";
import emailForgotPassword from "../helpers/emailForgotPassword.js";
export const register = async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await Veterinario.findOne({ email });
    if (user) {
      const error = new Error("Email exist");
      res.status(400).json({ msg: error.message });
      return;
    }

    const veterinario = new Veterinario(req.body);
    ///const veterinarioSaved = await veterinario.save()
    const veterinarioSaved = await veterinario.save();

    //send email
    emailRegister({
      email,
      name,
      token:veterinarioSaved.token})
    res.status(201).send("User created, check your email");
  } catch (error) {
    console.log(`======================`);
    console.log(colors.bgRed.black.bold(error.message));
    console.log(`======================`);
  }
};

export const profile = (req, res) => {
  const { veterinario } = req;

  res.json({ profile: veterinario });
};

export const confirmation = async (req, res) => {
  const { token } = req.params;
  try {
    const UserConfirmation = await Veterinario.findOne({ token });

    if (!UserConfirmation) {
      const error = new Error("Invalid token");
      res.status(400).json({ msg: error.message });
      return;
    }

    UserConfirmation.token = null;
    UserConfirmation.confirmed = true;
    await UserConfirmation.save()
    res.send("User confirmed successfully");
  } catch (error) {
    console.log(`======================`);
    console.log(colors.bgRed.black.bold(error.message));
    console.log(`======================`);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await Veterinario.findOne({ email });
    if (!userExist) {
      const error = new Error("User do not exist");
      res.status(403).json({ msg: error.message });
      return;
    }

    //check if user is confirmed
    if (!userExist.confirmed) {
      const error = new Error("User is not confirmed");
      res.status(403).json({ msg: error.message });
      return;
    }
    //check password
    if (!(await userExist.checkPassword(password))) {
      const error = new Error("Incorrect password");
      res.status(403).json({ msg: error.message });
      return;
    }
    res.json({
      _id:userExist._id,
      name:userExist.name,
      email:userExist.email,
      token:generateJWT(userExist._id)
    });
  } catch (error) {
    console.log(`======================`);
    console.log(colors.bgRed.black.bold(error.message));
    console.log(`======================`);
  }
};

//send email with token
export const forgotPassword = async (req, res) => {
  const { email} = req.body;

  try {
    const existVeterinario = await Veterinario.findOne({ email });
    if (!existVeterinario) {
      const error = new Error("User do not exist");
      res.status(400).json({ msg: error.message });
      return;
    }

    existVeterinario.token = generateId();
    await existVeterinario.save();

    //send email
    emailForgotPassword({
      email,
      name: existVeterinario.name,
      token: existVeterinario.token,
    });

    res.json({ msg: "We have send email about instructions" });
  } catch (error) {
    console.log(`======================`);
    console.log(colors.bgRed.black.bold(error.message));
    console.log(`======================`);
  }
};
//check token from email
export const CheckToken = async (req, res) => {
  const { token } = req.params;
  const validToken = await Veterinario.findOne({ token });

  if (validToken) {
    res.json({ msg: "Correct token" });
  } else {
    const error = new Error("Invalid token");
    res.status(400).json({ msg: error.message });
    return;
  }
};
export const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const veterinario = await Veterinario.findOne({ token });
    if (!veterinario) {
      const error = new Error("There is issuse");
      res.status(400).json({ msg: error.message });
      return;
    }
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({ msg: "Password changed successfully" });
  } catch (error) {
    console.log(`======================`);
    console.log(colors.bgRed.black.bold(error.message));
    console.log(`======================`);
  }
};

export const updateProfile= async(req,res)=>{
 
  const {email} = req.body

  try {
    const veterinario = await Veterinario.findById(req.params.id)
    if(!veterinario)
    {
      const error = new Error('There is error')
      res.status(400).json({msg:error.message})
      return
    }  
    if(veterinario.email !== email)
    {
      const existEmail = await Veterinario.findOne({email})
      if(existEmail)
      {
        const error = new Error('Email already exist')
        res.status(400).json({msg:error.message})
        return
      }
    }
    veterinario.name = req.body.name
    veterinario.email = req.body.email
    veterinario.phone = req.body.phone
    veterinario.web = req.body.web

    const veterianrioSaved = await veterinario.save()
    res.json(veterianrioSaved)
  } catch (error) {
    console.log(`======================`);
    console.log(colors.bgRed.black.bold(error.message));
    console.log(`======================`);
  }
}

export const updatePassword = async(req,res)=>{

  const {_id} = req.veterinario
  const {new_password,current_password}=req.body
  try {
    
  const existVeterinario = await Veterinario.findById(_id);
  if (!existVeterinario) {
    const error = new Error("User do not exist");
    res.status(400).json({ msg: error.message });
    return;
  }

  if(await existVeterinario.checkPassword(current_password))
  {
    existVeterinario.password = new_password
    await existVeterinario.save()
    res.json({msg:'Password saved successfully'})
    
  }else{
    const error = new Error("Current password is incorrect");
    res.status(400).json({msg:error.message})
    return
  }
  
  } catch (error) {
    console.log(`======================`);
    console.log(colors.bgRed.black.bold(error.message));
    console.log(`======================`);
  }

}