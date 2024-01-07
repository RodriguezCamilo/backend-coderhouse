import nodemailer from 'nodemailer'
import 'dotenv/config'

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'develokam@gmail.com',
        pass: process.env.NODEMAILER_PASS,
        authMethod: 'LOGIN'
    }
})

export const sendRecoveryMail = (email, recoveryLink) => {
    const mailOptions = {
        from: 'develokam@gmail.com',
        to: email,
        subject: 'KAMSHOP - Reestablecer su contraseña',
        text: `Haga click en el siguiente enlace para reestablecer su contraseña: ${recoveryLink}`
    }
    transport.sendMail(mailOptions, (error, info)=> {
        if (error) {
            console.log(error)
        } else {
            console.log('Email enviado correctamente')
        }
    })
}

