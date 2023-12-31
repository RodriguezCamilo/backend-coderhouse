import { Router } from "express";
import passport from "passport";

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), async (req, res) => {

    try {
        if (!req.user) {
            return res.status(401, '/login').send({ mensaje: "Credenciales invalidas" })
        }

        req.session.user = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            age: req.user.age,
            email: req.user.email,
        }

        res.redirect(301, '/static')

    } catch (error) {
        res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` })
    }

})



sessionRouter.post('/register', passport.authenticate('register'), async (req, res) => {

    try {
        if (!req.user) {
            return res.status(400).send({ mensaje: "Usuario existente" })
        }

        res.redirect(301, '/login')

    } catch (error) {
        res.status(500).send({ mensaje: `Error al registrar el usuario ${error}` })
    }

})

sessionRouter.get('/github', passport.authenticate('github'), async (req, res) =>{
    req.session.user = req.user
    res.redirect(301, '/static')
})

sessionRouter.get('/githubCallback', passport.authenticate('github', {failureRedirect: '/login', scope: ['user:email']}), async (req, res) =>{
    req.session.user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        age: req.user.age,
        email: req.user.email,
    }
    res.redirect(301, '/static')
})

sessionRouter.get('/logout', (req, res) => {
    if (req.session && req.session.user) {
        req.session.destroy()
    }
    res.redirect(301, '/login')
})

sessionRouter.get('/user', (req, res) => {
    if (req.session.user) {
        const user = req.session.user
        res.status(200).send(user)
    }
})

export default sessionRouter