import 'dotenv/config'
import { __dirname } from './path.js'

import express from 'express'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import { Server } from 'socket.io'
import cors from 'cors'

import prodsRouter from "./routes/products.routes.js"
import userRouter from './routes/users.routes.js'
import cartRouter from "./routes/carts.routes.js"
import sessionRouter from './routes/sessions.routes.js'

import { productModel } from './models/products.models.js'


import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passport.js'
import session from 'express-session'
import loggerRouter from './routes/logger.routes.js'
import { addLogger } from './config/logger.js'

import swaggerUiExpress from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc'

const whiteList = ['http://localhost:5173', 'http://localhost:5173/logout']
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) != 1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Acceso denegado"));
        }
    },
    credentials: true
};


const app = express()
const PORT = 3000

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: "Documentacion de KamShop",
            description: "API KamShop Ecommerce",
            contact: {
                name: 'Camilo Rodriguez',
                email: 'rodriguezcamilotrabajo@gmail.com'
            }
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)

const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

//Mongoose DB

mongoose.connect(process.env.MONGODB_URL)
    .then(async () => console.log('DB is connected'))
    .catch(() => console.log('Error in connection'))

//Middlewares

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 500
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false

}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(addLogger)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

//Socket


const io = new Server(serverExpress)

io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")

    socket.on("llamarProductos", async () => {
        const products = await productModel.find()
        socket.emit("productos", products)
    })

    socket.on("nuevoProducto", async (nuevoProd) => {
        const { title, description, price, stock, category, code, thumbnail } = nuevoProd
        await productModel.create({ title, description, price, stock, category, code, thumbnail })
    })

})

//Routes 

app.use('/api/users', userRouter)
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/session', sessionRouter)
app.use('/api/loggerTest', loggerRouter)