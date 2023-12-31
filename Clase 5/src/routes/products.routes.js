import { Router } from "express";

const prodsRouter = Router()

prodsRouter.get('/', async (req, res) =>{
    const {limit} = req.query 
    const prods = await Manager.getProducts()
    const products = prods.slice(0, limit)

    res.status(200).send(products)
})

prodsRouter.get('/:id', async (req,res) =>{
    const {id} = req.params
    const prod = await Manager.getProductById(parseInt(id))

    if(prod){
        res.status(200).send(prod)
    }else{
        res.status(404).send("Ese producto no existe.")
    }
})

export default prodsRouter