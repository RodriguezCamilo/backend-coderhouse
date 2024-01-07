import { userModel } from "../models/users.models.js"
import { sendRecoveryMail } from "../config/nodemailer.js"
import { createHash } from '../utils/bcrypt.js'
import crypto from 'crypto'

export const getUsers = async (req, res) => {
    const { limit } = req.query

    try {
        const users = await userModel.find().limit(limit)
        res.status(200).send({ respuesta: 'OK', mensaje: users })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar usuarios', mensaje: error })
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await userModel.findById(id)
        if (user) {

            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error', mensaje: 'Not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar usuarios', mensaje: error })
    }
}

export const putUser = async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, age, email, password } = req.body

    try {
        const user = await userModel.findByIdAndUpdate(id, { firstName, lastName, age, email, password })
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error', mensaje: 'Not Found' })
        }

    } catch (error) {
        res.status(400).send({ respuesta: 'Error en editar usuario', mensaje: error })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await userModel.findByIdAndDelete(id)
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error', mensaje: 'Not Found' })
        }

    } catch (error) {
        res.status(400).send({ respuesta: 'Error en borrar usuario', mensaje: error })
    }
}

const recoveryLinks = {}

export const recoveryPassword = async (req, res) => {
    const { email } = req.body

    try {
        const token = crypto.randomBytes(20).toString('hex')
        recoveryLinks[token] = { email: email, timestamp: Date.now() }

        const recoveryLink = `http://localhost:5173/change-password/${token}`

        sendRecoveryMail(email, recoveryLink)

        res.status(200).send('Correo de recuperacion enviado')
    } catch (error) {
        res.status(500).send(`Error al enviar el mail ${error}`)
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params
    const { newPassword, newPassword2 } = req.body
    console.log(newPassword, newPassword2)
    try {
        const linkData = recoveryLinks[token]
        console.log(linkData)
        if (linkData && Date.now() - linkData.timestamp <= 3600000) {
            const { email } = linkData
            if (newPassword == newPassword2) {
                const passwordHash = createHash(newPassword)
                console.log(passwordHash)
                delete recoveryLinks[token]
                
                await userModel.findOneAndUpdate({email: email}, { password: passwordHash })
                res.status(200).send('Contraseña modificada correctamente')
            } else {
                res.status(400).send('Las contraseñas no son iguales')
            }
        } else {
            res.status(400).send('Token expirado')
        }
    } catch (error) {
        res.status(500).send(`Error al reestablecer contraseña ${error}`)
    }
}