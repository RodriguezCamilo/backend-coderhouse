import { generateToken } from "../utils/jwt.js";

export const postLogin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401, '/login').send({ mensaje: "Credenciales invalidas" })
        }

        let resuser = {
            _id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            age: req.user.age,
            email: req.user.email,
            rol: req.user.rol,
            cart: req.user.cart,
            __v: req.user.__v

        }
        const token = generateToken(resuser)
        res.status(200).send({token})

    } catch (error) {
        res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` })
    }
}

export const postRegister = async (req, res) => {
    try {
        console.log("ajam")
        if (!req.user) {
            return res.status(400).send({ mensaje: "Usuario existente" })
        }

        res.status(200).send({mensaje: "Usuario creado"})

    } catch (error) {
        res.status(500).send({ mensaje: `Error al registrar el usuario ${error}` })
    }
}

export const getGithub = async (req, res) => {
    req.session.user = req.user
    res.redirect(301, '/static')
}

export const getGithubCallback = async (req, res) => {
    req.session.user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        age: req.user.age,
        email: req.user.email,
    }
    res.redirect(301, '/static')
}

export const getLogout = async (req, res) => {
    res.clearCookie('jwtCookie')
    res.status(200).send({mensaje: 'Sesion cerrada'})
}

export const getUser = async (req, res) => {
    if (req.session.user) {
        const user = req.session.user
        res.status(200).send(user)
    }
}

export const getCurrent = (req, res) => {
    res.send(req.user)
}