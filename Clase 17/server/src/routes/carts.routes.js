import { Router } from "express"
import { passportError, authorization } from "../utils/messagesError.js";
import { getCart, postCart, deleteCart, deleteCartProduct, putCart, putCartProduct, purchaseCart } from "../controllers/cart.controller.js"

const cartRouter = Router()

cartRouter.get("/:cid", getCart)
cartRouter.post('/:cid/products/:pid', postCart)
cartRouter.delete('/:cid', deleteCart)
cartRouter.delete('/:cid/products/:pid', deleteCartProduct)
cartRouter.put('/:cid', putCart)
cartRouter.put('/:cid/products/:pid', putCartProduct)
cartRouter.post('/:cid/purchase', purchaseCart)

export default cartRouter