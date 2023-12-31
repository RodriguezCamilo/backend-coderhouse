import express from 'express'
import prodsRouter from "./routes/products.routes.js";
import cartsRouter from './routes/carts.routes.js';
import { __dirname } from './path.js';
import path from 'path'

//Server
const app = express()
const PORT = 4000


//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartsRouter)
app.use('/static', express.static(path.join(__dirname, '/public')))



app.listen(PORT, () =>{
    console.log(`Server on port ${PORT}`)
})