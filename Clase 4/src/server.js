import express from 'express' 
import {ProductsManager} from './components/ProductsManager.js'

const PORT = 4000

const app = express()

app.use(express.json())

const Manager = new ProductsManager('./products.json')
const prods = Manager.readProducts()

app.get('/', (req, res) =>{
    res.send("Buenas tardes")
})

app.get('/products', async (req, res) =>{
    let findprods = await prods
    const {limit} = req.query
    if(limit){
        const prod = findprods.slice(0,limit)
        res.send(prod)
    }else{
        res.send(await findprods)
    }

})


app.get('/products/:id', async (req, res) =>{
    let findprods = await prods
    const prod = findprods.find(prod => prod.id === parseInt(req.params.id))

    if(prod){
        res.send(prod)
    } else{
        res.send("Ese producto no existe")
    }
})



app.listen(PORT, () =>{
    console.log(`Server on ${PORT}`)
})
