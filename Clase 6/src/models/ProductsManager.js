import {promises as fs} from "fs"

export class ProductsManager {
    constructor(path) {
      this.path = path
    }

    isValidProduct(product) {
        return (
            product.title !== null &&
            product.title !== undefined &&
            product.title !== "" &&
            product.description !== null &&
            product.description !== undefined &&
            product.description !== "" &&
            typeof product.price === "number" &&
            !isNaN(product.price)&&
            product.thumbnail !== null &&
            product.thumbnail !== undefined &&
            product.thumbnail !== "" &&
            product.code !== null &&
            product.code !== undefined &&
            product.code !== "" &&
            typeof product.stock === "number" &&
            !isNaN(product.stock)
        )
      }
  
    async readProducts(){
        return JSON.parse(await fs.readFile(this.path, 'utf-8'))
    }

    async getProducts() {
        const prods = await this.readProducts()
        return prods
    }

    async getProductById(id){
        const prods = await this.readProducts()
        const prod = prods.find(product => product.id === id)

        if (prod) {
            return prod
        } 
    }

    async getProductByCode(code){
        const prods = await this.readProducts()
        const prod = prods.find(product => product.code === code)

        if (prod) {
            return prod
        } 
    }

    async addProduct (title, description, price, thumbnail, code, stock) {
        const prods = await this.readProducts()
        const duplicateCode = prods.some(product => product.code === code)
        
        if  (!title || !description || !price || !code || !stock){
            console.log('Todos los campos son obligatorios')
            return
        } else if (duplicateCode){
            console.log('El código ya existe')
            return
        } else {
            const producto = new Product(title, description, price, thumbnail, code, stock)
            prods.push(producto)
            await fs.writeFile(this.path, JSON.stringify(prods))
        }
    }

    async updateProduct  (id, product){
        const prods = await this.readProducts()
        const indice = prods.findIndex(prod => prod.id === id)
        
        if(indice != -1){
            prods[indice].title = product.title
            prods[indice].description = product.description
            prods[indice].price = product.price
            prods[indice].thumbnail = product.thumbnail
            prods[indice].code = product.code
            prods[indice].stock = product.stock
            await fs.writeFile(this.path, JSON.stringify(prods))
        } else {
            console.log("Producto inexistente")
        }
    }

    async deleteProduct (id) {
        const prods = await this.readProducts()
        const prod = prods.find(product => product.id === id)

        if (prod){
            await fs.writeFile(this.path, JSON.stringify(prods.filter(prod => prod.id != id)))
        } else {
            console.log("Producto inexistente")
        }
    }
}

class Product {
    constructor (title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.idIncre()
    }
    static idIncre () {
        if(this.idIncrement){
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}