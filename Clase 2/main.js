class ProductsManager {
    constructor(products = []) {
      this.products = products
    }
  

    addProduct (product) {
        if (!this.isValidProduct(product)) {
            console.error("Error: El producto no contiene todos los campos requeridos o tienen valores inválidos.")
            return
          }
        else if (!this.isProductCodeUnique(product.code)) {
            console.error(`Error: El CODE "${product.code}" ya está en uso.`)
            return
          }
        const id = this.idProduct()
        product.id = id
        this.products.push(product)
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
  
    isProductCodeUnique(productCode) {
      return !this.products.some((product) => product.code === productCode)
    }

    idProduct () {
        if(this.products.length < 1) return 1
        const ids = this.products.map(product => product.id)
        const id = Math.max(...ids) + 1
        return id
    }
  

    removeProduct(productId) {
      this.products = this.products.filter((product) => product.id !== productId)
    }

    getProducts() {
      return this.products
    }

    getProductById(productId) {
        if (this.isValidId(productId)) {
            console.error(`Error: No se encontró ningún producto con el ID "${productId}".`)
            return
        }
        return this.products.find((product) => product.id === productId)
    }

    isValidId(productId) {
        return (this.products.find((product) => product.id === productId) === undefined)
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
    }
}

const Manager = new ProductsManager

const SillaGamer = new Product("Silla gamer", "Ostia una silla gamer que flipas", 500, "asd", 1234, 3)

const Auriculares = new Product("Auriculares Logitech", "OWO", 200, "gdjfd", 1235, 6)

Manager.addProduct(SillaGamer)

Manager.addProduct(Auriculares)

