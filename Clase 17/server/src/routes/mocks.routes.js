import { Router } from "express"
import { getfakerProducts } from "../controllers/mock.controller.js"

const mockingRouter = Router()

mockingRouter.get('/', getfakerProducts)

export default mockingRouter