import { cartModel } from "../models/carts.models.js"
import { productModel } from "../models/products.models.js"
import {ticketModel} from '../models/tickets.models.js'

export const getCart = async (req, res) => {
    const { cid } = req.params

    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            res.status(200).send({ respuesta: "Ok", mensaje: cart })
        } else {
            res.status(404).send({
                respuesta: "Error en consultar carrito",
                mensaje: "No encontrado",
            })
        }
    } catch (error) {
        res
            .status(400)
            .send({ respuesta: "error en consultar carrito", mensaje: error })
    }
}

export const postCart = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const prod = await productModel.findById(pid)
            if (prod) {
                const indice = cart.products.findIndex(item => item.id_prod._id.toString() === pid)
                if (indice !== -1) {
                    cart.products[indice].quantity = quantity
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity })
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
            } else {
                res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Produt Not Found' })
            }
        } else {
            res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Cart Not Found' })
        }

    } catch (error) {
        res.status(400).send({ respuesta: 'Error en agregar producto Carrito', mensaje: error })
    }
}

export const deleteCart = async (req, res) => {
    const { cid } = req.params
    try {
        await cartModel.findByIdAndUpdate(cid, { products: [] })
        res.status(200).send({ respuesta: 'ok', mensaje: 'Carrito vacio' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error getting cart by id', mensaje: error })
    }
}

export const deleteCartProduct = async (req, res) => {
    const { cid, pid } = req.params
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const prod = await productModel.findById(pid)
            if (prod) {
                const indice = cart.products.findIndex(item => item.id_prod._id.toString() == pid)
                if (indice !== -1) {
                    cart.products.splice(indice, 1)
                }
            }
        }
        const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
        res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error getting cart by id', mensaje: error })
    }
}

export const putCart = async (req, res) =>{
    const { cid } = req.params
    const productsArray = req.body.products

    if (!Array.isArray(productsArray)) {
        return res.status(400).send({ respuesta: 'Error', mensaje: 'Products should be an array' })
    }

    try {
        const cart = await cartModel.findById(cid)
        if (!cart) {
            throw new Error("Cart not found")
        }
        for (let prod of productsArray) {
            const indice = cart.products.findIndex(cartProduct => cartProduct.id_prod.toString() === prod.id_prod)

            if (indice !== -1) {
                cart.products[indice].quantity = prod.quantity
            } else {
                const existe = await productModel.findById(prod.id_prod)
                if (!existe) {
                    throw new Error(`Product with ID ${prod.id_prod} not found`)
                }
                cart.products.push(prod)
            }
        }
        const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
        res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message })
    }
}

export const putCartProduct = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const prod = await productModel.findById(pid)
            if (prod) {
                const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === pid)
                if (index !== -1) {
                    cart.products[index].quantity = quantity
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity })
                }
            }
        }
        const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true })
        res.status(200).send({ respuesta: 'OK', mensaje: 'Cart Updated', cart: updatedCart })
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message })
    }
}

export const purchaseCart = async (req, res) => {
    const { cid } = req.params
    const {user} = req.body
    const purchaser = user.email

    try {
        const cart = await cartModel.findById(cid)
        if (!cart) {
            res.status(404).send({ respuesta: 'Error', message: `Cart ${cid} does not exist` })
        }

        let montoTotal = 0
        const productosConStock = []
        const productosSinStock = []

        for (const cartProduct of cart.products) {
            const product = await productModel.findById(cartProduct.id_prod)

            if (!product) {
                return res.status(404).send({ respuesta: "Error", mensaje: `Product ${cartProduct.id_prod} does not exist` })
            }

            if (cartProduct.quantity <= product.stock) {
                montoTotal += product.price * cartProduct.quantity
                product.stock -= cartProduct.quantity
                cartProduct.quantity = 0
                await productModel.findByIdAndUpdate(cartProduct.id_prod, product)
                productosConStock.push(cartProduct)
            } else {
                productosSinStock.push(cartProduct)
            }
        }

        if(user.rol == 'premium') {
            montoTotal = montoTotal * 0.9
        }

        const ticket = await ticketModel.create({ amount: montoTotal, purchaser: purchaser })
        if (ticket) {

            const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true })

            if (updatedCart) {
                return res.status(200).send({ mensaje: "Ticket created successfully", payload: {ticket} })
            }
        }
        res.status(500).send({ respuesta: "Error", mensaje: "Server error" })
    } catch (error) {
        res.status(400).send({ res: 'Error en finalización del carrito', message: error })
    }
}