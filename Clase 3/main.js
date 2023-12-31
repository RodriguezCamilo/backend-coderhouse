import {promises as fs} from "fs"

class ProductsManager {
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
  
    async getProducts() {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        console.log(prods)
    }

    async getProductsById(id){
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = prods.find(product => product.id === id)

        if (prod) {
            console.log(prod)
        } else {
            console.log("Producto inexistente")
        }
    }

    async addProduct (product) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prodId = prods.find(producto => producto.id === product.id)
        const prodCode = prods.find(producto => producto.code === product.code)
        

        if (prodId ||prodCode ) {
            console.log("Ese producto ya existe")
        }

        else if (!this.isValidProduct(product)) {
            console.error("Error: El producto no contiene todos los campos requeridos o tienen valores inválidos.")
            return
          } else {
            prods.push(product)
            await fs.writeFile(this.path, JSON.stringify(prods))
        }
    }

    async updateProduct  (id, product){
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
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
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
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

const Manager = new ProductsManager("./products.json")

const SillaGamer = new Product("Silla gamer", "Ostia una silla gamer que flipas", 500, "asd", 1234, 3)

Manager.addProduct(SillaGamer)