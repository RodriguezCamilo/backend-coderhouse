import { Router } from "express"
import { passportError, authorization } from "../utils/messagesError.js";
import { getCart, postCart, deleteCart, deleteCartProduct, putCart, putCartProduct, purchaseCart } from "../controllers/cart.controller.js"

const cartRouter = Router()

cartRouter.get('/:cid', passportError('jwt'), authorization(['user', 'premium']), getCart)
cartRouter.post('/:cid/products/:pid', passportError('jwt'), authorization(['user', 'premium']), postCart)
cartRouter.delete('/:cid', passportError('jwt'), authorization(['user', 'premium']), deleteCart)
cartRouter.delete('/:cid/products/:pid', passportError('jwt'), authorization(['user', 'premium']), deleteCartProduct)
cartRouter.put('/:cid', passportError('jwt'), authorization(['user', 'premium']), putCart)
cartRouter.put('/:cid/products/:pid', passportError('jwt'), authorization(['user', 'premium']), putCartProduct)
cartRouter.post('/:cid/purchase', passportError('jwt'), authorization(['user', 'premium']), purchaseCart)

export default cartRouter