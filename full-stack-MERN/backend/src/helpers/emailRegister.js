import { transport } from '../config/email.js'

const emailRegister = async(data) => {


    const {email,name,token} = data
    const info = await transport.sendMail({
        from:"APV - Administrador de Pacientes de Veterinaria",
        to:email,
        subject:"Confirm your account",
        text:"Confirm your account",
        html:`<p>Hi: ${name}, confirm your account on APV.</p>
              <p>Your account have been created, only you most confirm on the next link: <a href=${process.env.FRONT_URL}/confirm/${token}>Confirm account</a></p>
              <p>If you not create the account, can you ignorate this message</p>
              `
    })        
}


export default emailRegister