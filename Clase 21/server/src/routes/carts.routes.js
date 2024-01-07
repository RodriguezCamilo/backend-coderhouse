import { Router } from "express"
import { passportError, authorization } from "../utils/messagesError.js";
import { getCart, getCarts, putCart, updateProduct, postCart, deleteCart, deleteCartProduct, purchaseCart } from "../controllers/cart.controller.js"

const cartRouter = Router()

cartRouter.get('/', passportError('jwt'), authorization(['admin']), getCarts)
cartRouter.get('/:cid', passportError('jwt'), authorization(['user', 'premium']), getCart)
cartRouter.post('/:cid/products/:pid', passportError('jwt'), authorization(['user', 'premium']), postCart)
cartRouter.put('/:cid', passportError('jwt'), authorization(['user', 'premium']), putCart)
cartRouter.put('/:cid/products/:pid', passportError('jwt'), authorization(['user', 'premium']), updateProduct)
cartRouter.delete('/:cid', passportError('jwt'), authorization(['user', 'premium']), deleteCart)
cartRouter.delete('/:cid/products/:pid', passportError('jwt'), authorization(['user', 'premium']), deleteCartProduct)
cartRouter.post('/:cid/purchase', passportError('jwt'), authorization(['user', 'premium']), purchaseCart)

export default cartRouter