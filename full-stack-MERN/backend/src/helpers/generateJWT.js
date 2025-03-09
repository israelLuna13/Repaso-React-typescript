import jwt from 'jsonwebtoken'
export  const generateJWT =(idUser)=>{
    return jwt.sign({id:idUser},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })

}