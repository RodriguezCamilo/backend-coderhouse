import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";

import { postLogin, postRegister, getGithub, getGithubCallback, getLogout, getCurrent, getUser } from "../controllers/sessions.controller.js";


const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), postLogin)
sessionRouter.post('/register', passport.authenticate('register'), postRegister)
sessionRouter.get('/github', passport.authenticate('github'), getGithub)
sessionRouter.get('/githubCallback', passport.authenticate('github', { failureRedirect: '/login', scope: ['user:email'] }), getGithubCallback)
sessionRouter.get('/logout', getLogout)
sessionRouter.get('/user', getUser)
sessionRouter.get('/current', passportError('jwt'), authorization('admin'), getCurrent)

export default sessionRouter