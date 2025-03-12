import nodemailer from 'nodemailer'

const emailRegister = async(data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: +process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
    })

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