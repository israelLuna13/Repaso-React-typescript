import nodemailer from 'nodemailer'

const emailForgotPassword = async(data) => {
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
        subject:"Change your password",
        text:"Change your password",
        html:`<p>Hi: ${name}, you have request change your password  APV.</p>
              <p>Follow the next link: <a href=${process.env.FRONT_URL}/forgot-password/${token}>Change password</a></p>
              <p>If you not request change password, can you ignorate this message</p>
              `
    })        
}


export default emailForgotPassword