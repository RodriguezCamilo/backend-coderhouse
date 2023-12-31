import { Router } from "express"
import { getUsers, getUser, putUser, deleteUser, recoveryPassword, resetPassword } from "../controllers/users.controller.js"

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.put('/:id', putUser)
userRouter.delete('/:id', deleteUser)
userRouter.post('/recovery-password', recoveryPassword)
userRouter.post('/reset-password/:token', resetPassword)

export default userRouter