import { Router } from "express"
import { getCart, postCart, deleteCart, deleteCartProduct, putCart, putCartProduct } from "../controllers/cart.controller.js"

const cartRouter = Router()

cartRouter.get("/:cid", getCart)
cartRouter.post('/:cid/products/:pid', postCart)
cartRouter.delete('/:cid', deleteCart)
cartRouter.delete('/:cid/products/:pid', deleteCartProduct)
cartRouter.put('/:cid', putCart)
cartRouter.put('/:cid/products/:pid', putCartProduct)

export default cartRouter