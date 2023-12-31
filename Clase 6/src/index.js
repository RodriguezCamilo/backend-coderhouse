import express from 'express'
import multer from 'multer'
import prodsRouter from "./routes/products.routes.js";
import { __dirname } from './path.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';

import { ProductsManager } from './models/ProductsManager.js';
const Manager = new ProductsManager('./src/models/products.json')


const PORT = 4000
const app = express()

//Config
const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

//Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine()) 
app.set('view engine', 'handlebars') 
app.set('views', path.resolve(__dirname, './views')) 
app.use('/static', express.static(path.join(__dirname, '/public')))

//Server Socket.io

const io = new Server(serverExpress)

io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")
    
    socket.on("nuevoProducto", async (nuevoProd) =>{
        const { title, description, price, thumbnail, code, stock } = nuevoProd
        await Manager.addProduct(title, description, price, thumbnail, code, stock)
        
    })
    
    socket.on("llamarProductos", async ()=>{
        const products = await Manager.getProducts()
        socket.emit("productos", products)
    })

})

//Routes

app.use('/api/products', prodsRouter)

app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
        js: "realTimeProducts.js",
        css: "style.css",
        title: "Products",
    })
})

app.get('/static', (req, res) => {
    res.render('home', {
        js: "home.js",
        css: "style.css",
        title: "Home",
    })
})