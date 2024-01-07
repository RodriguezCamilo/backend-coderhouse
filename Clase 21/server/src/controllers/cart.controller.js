import { cartModel } from "../models/carts.models.js"
import { productModel } from "../models/products.models.js"
import { ticketModel } from '../models/tickets.models.js'

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

export const getCarts = async (req, res) => {
    const { limit } = req.query

    try {
        const carts = await cartModel.find().limit(limit)
        res.status(200).send({ respuesta: 'OK', mensaje: carts })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar carritos', mensaje: error })
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
                const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === pid)
                if (index !== -1) {
                    cart.products[index].quantity = quantity
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity ? quantity : 1 })
                }
            }
        }
        const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true })
        res.status(200).send({ respuesta: 'OK', mensaje: 'Carrito actualizado', cart: updatedCart })
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message })
    }
}

export const putCart = async (req, res) => {
    const { cid } = req.params;
    const productsArray = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (!cart) {
            return res.status(404).send({ respuesta: "Error", mensaje: "Carrito no encontrado" })
        }

        if (!Array.isArray(productsArray)) {
            return res.status(400).send({ respuesta: "Error", mensaje: "Los productos deben estar en un array" })
        }

        const updatedProducts = []

        for (const prod of productsArray) {
            const product = await productModel.findById(prod.id_prod)

            if (!product) {
                return res.status(404).send({ respuesta: "Error", mensaje: `Producto con ID ${prod.id_prod} no encontrado` })
            }

            const index = cart.products.findIndex((item) => item.id_prod._id.toString() === prod.id_prod)

            if (index !== -1) {
                cart.products[index].quantity = prod.quantity;
            } else {
                cart.products.push({ id_prod: prod.id_prod, quantity: prod.quantity })
            }

            updatedProducts.push({ id_prod: prod.id_prod, quantity: prod.quantity })
        }

        const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true });
        res.status(200).send({ respuesta: "OK", mensaje: "Carrito actualizado exitosamente", productosActualizados: updatedProducts, carrito: updatedCart })
    } catch (error) {
        res.status(500).send({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    }
}

export const updateProduct = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (!cart) { res.status(404).send({ error: 'Ese carrito no existe' }) }

        const prod = await productModel.findById(pid)
        if (!prod) { res.status(404).send({ error: 'Ese producto no existe' }) }

        const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === pid)
        if (index == -1) { return res.status(404).send({ error: 'Ese producto no esta en el carrito' }) }


        cart.products[index].quantity = quantity

        const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true })
        res.status(200).send({ respuesta: 'OK', mensaje: 'Carrito actualizado', cart: updatedCart })
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message })
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
        if (!cart) { res.status(404).send({ error: 'Ese carrito no existe' }) }

        const prod = await productModel.findById(pid)

        if (!prod) { res.status(404).send({ error: 'Ese producto no existe' }) }
        const indice = cart.products.findIndex(item => item.id_prod._id.toString() == pid)

        if (indice !== -1) {
            cart.products.splice(indice, 1)
        } else {
            return res.status(404).send({ error: 'Ese producto no esta en el carrito' }) 
        }

        const respuesta = await cartModel.findByIdAndUpdate(cid, cart)

        res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error getting cart by id', mensaje: error })
    }
}


export const purchaseCart = async (req, res) => {
    const { cid } = req.params
    const { user } = req.body
    const purchaser = user.email

    try {
        const cart = await cartModel.findById(cid)
        if (!cart) {
            res.status(404).send({ respuesta: 'Error', message: `Cart ${cid} does not exist` })
        }

        let montoTotal = 0
        const productsWithStock = []
        const productsNoStock = []

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
                productsWithStock.push(cartProduct)
            } else {
                productsNoStock.push(cartProduct)
            }
        }

        if (user.rol == 'premium') {
            montoTotal = montoTotal * 0.9
        }

        const ticket = await ticketModel.create({ amount: montoTotal, purchaser: purchaser })
        if (ticket) {

            const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true })

            if (updatedCart) {
                return res.status(200).send({ mensaje: "Ticket created successfully", payload: { ticket } })
            }
        }
        res.status(500).send({ respuesta: "Error", mensaje: "Server error" })
    } catch (error) {
        res.status(400).send({ res: 'Error en finalización del carrito', message: error })
    }
}