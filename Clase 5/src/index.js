import express  from "express"
import multer from "multer"
import prodsRouter from "./routes/products.routes.js"
import { __dirname } from "./path.js"
import {engine} from 'express-handlebars'
import path from 'path'

//Server

const app = express()
const PORT = 4000

//Config

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

//Middleware

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

const upload = multer({storage: storage})

//Routes

app.use('/api/products', prodsRouter)
app.use('/static', express.static(path.join(__dirname, '/public')))

app.get('/static', (req, res) =>{

    const user = {
        nombre:"Kam",
        cargo: "Pajero"
    }
    res.render('home', {
        user: user,
        css: "products.css",
        title: "products",
        esPajero: user.cargo === "Pajero"
    })
})

app.post('/upload', upload.single('product'), (req, res)=>{
    res.status(200).send()
})

app.listen(PORT, () =>{
    console.log(`Server on port ${PORT}`)
})

console.log(__dirname)