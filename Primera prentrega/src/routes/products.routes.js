import { Router } from "express";
import { ProductsManager } from "../models/ProductsManager.js";

const Manager = new ProductsManager('./src/models/products.json')

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

prodsRouter.post('/', async (req, res) => {
    const { code } = req.body;
    const confirmacion = await Manager.getProductByCode(code)
    if(confirmacion) {
        res.status(400).send("Producto ya existente");
    } else {
        const { title, description, price, thumbnail, code, stock } = req.body;
        res.send(await Manager.addProduct(title, description, price, thumbnail, code, stock));

    }

});

prodsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const confirmacion = await Manager.getProductById(parseInt(req.params.id));
    if(confirmacion) {
        await Manager.updateProduct(parseInt(id), req.body)
        res.status(200).send("Producto actualizado")
    } else {
        res.status(404).send("Producto no encontrado")

    }
});

prodsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const confirmacion = await Manager.getProductById(parseInt(req.params.id));
    if(confirmacion) {
        await Manager.deleteProduct(parseInt(id))
        res.status(200).send("Producto eliminado")
    } else {
        res.status(404).send("Producto no encontrado")

    }
});

export default prodsRouter