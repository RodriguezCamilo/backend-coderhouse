import 'dotenv/config'

import express from 'express'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import cors from 'cors'

import path from 'path'
import { __dirname } from './path.js'

import prodsRouter from "./routes/products.routes.js"
import userRouter from './routes/users.routes.js'
import cartRouter from "./routes/carts.routes.js"
import sessionRouter from './routes/sessions.routes.js'

import { productModel } from './models/products.models.js'


import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passport.js'
import session from 'express-session'
import mockingRouter from './routes/mocks.routes.js'


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
const PORT = 4000

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

//Handlebars

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use('/realTimeProducts', express.static(path.join(__dirname, '/public')))
app.use('/login', express.static(path.join(__dirname, '/public')))
app.use('/signIn', express.static(path.join(__dirname, '/public')))
app.use('/logOut', express.static(path.join(__dirname, '/public')))

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

app.get('/login', (req, res) => {
    res.render('login', {
        js: "login.js",
        css: "style.css",
        title: "Login",
    })
})

app.get('/signIn', (req, res) => {
    res.render('signIn', {
        js: "signIn.js",
        css: "style.css",
        title: "SignIn",
    })
})

app.get('/logOut', (req, res) => {
    res.render('logOut', {
        js: "logOut.js",
        css: "style.css",
        title: "LogOut",
    })
})

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
app.use('/api/sessions', sessionRouter)
app.use('/api/mockingproducts', mockingRouter)