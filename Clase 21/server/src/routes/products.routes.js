import { Router } from "express"
import { passportError, authorization } from "../utils/messagesError.js";
import { getProducts, getProduct, putProduct, postProduct, deleteProduct } from "../controllers/products.controller.js";

const productRouter = Router()

productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct)
productRouter.put('/:id', passportError('jwt'), authorization(['admin']), putProduct)
productRouter.delete('/:id', passportError('jwt'), authorization(['admin']), deleteProduct)
productRouter.post('/', passportError('jwt'), authorization(['admin']), postProduct)

export default productRouter