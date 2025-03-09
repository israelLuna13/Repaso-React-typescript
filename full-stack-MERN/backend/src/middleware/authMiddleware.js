import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinaria.js";

const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   const veterinario = await Veterinario.findById(decoded.id).select(
    //     "-password -token -confirmed"
    //   );
      req.veterinario= await Veterinario.findById(decoded.id).select(
        "-password -token -confirmed"
      );

      return next();
    } catch (e) {
      const error = new Error("Invalid token");
      res.status(403).json({ msg: error.message });
      console.log(e);
      return
    }
  }
  if (!token) {
    const error = new Error("Invalid token or token do not exist");
    res.status(403).json({ msg: error.message });
  }

  next();
};
export default checkAuth;
