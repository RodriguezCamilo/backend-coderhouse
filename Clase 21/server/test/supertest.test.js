import "dotenv/config"

import { expect } from 'chai'
import mongoose from "mongoose"
import supertest from "supertest"

const requester = supertest('http://localhost:3000')

await mongoose.connect(process.env.MONGODB_URL)

let cookie = {}

describe('Test Users Session api/session', function () {
    this.timeout(15000)

    /*it("Ruta: api/session/register con metodo POST", async () => {
        const newUser = {
            firstName: "Kam",
            lastName: "Dev",
            age: 18,
            email: "dev@kam.com",
            password: "kam"
        }

        const { _body } = await requester.post('/api/session/register').send(newUser)

        expect(_body).to.be.ok
    })*/

    it("Ruta: api/session/login con metodo POST", async () => {
        const user = {
            email: "admin@admin.com",
            password: "admin"
        }

        const resultado = await requester.post('/api/session/login').send(user)
        const cookieResult = resultado._body.token

        expect(cookieResult).to.be.ok
        cookie = {
            name: "token",
            value: cookieResult
        }
        expect(cookie.name).to.be.ok.and.equal('token')
        expect(cookie.value).to.be.ok
    })

    it("Ruta: api/session/current con metodo GET", async () => {

        const { _body } = await requester.get('/api/session/current')
            .set('Authorization', [`${cookie.value}`])

        expect(_body.user.email).to.be.equal('admin@admin.com')
    })
})

describe('Test Products api/products', function () {

    it("Ruta: api/products con metodo GET", async () => {

        const { _body } = await requester.get('/api/products')

        expect(_body.payload).not.to.be.deep.equal([])
    })

    it("Ruta: api/products con metodo GET", async () => {

        const { _body } = await requester.get('/api/products/650356f9a5e02964abdf8f4d')

        console.log(_body)
        expect(_body.mensaje).to.have.property('_id')
    })

    it('Crear un producto mediante POST', async () => {
        //Solo usuario Admin

        const product = {
            title: "Producto de prueba",
            description: "Lorem ipsum",
            price: 200,
            stock: 3,
            category: "test",
            code: "1234"
        }

        const { _body } = await requester.post('/api/products').send(product)
            .set('Authorization', [`${cookie.value}`])

        console.log(_body)
        expect(_body).to.be.ok
    })
})

describe('Test Carts api/carts', function () {

    it("Ruta: api/cart con metodo GET", async () => {
        //Solo usuario Admin

        const { _body } = await requester.get('/api/carts')
            .set('authorization', [`${cookie.value}`])
            
        expect(_body.payload).not.to.be.deep.equal([])
    })

    it("Ruta: api/carts con metodo GET", async () => {
        //Admin no puede ver su carrito, ruta protegida
        const { _body } = await requester.get('/api/carts/659a0af47de2b08a4ea4650f')

        console.log(_body)
        expect(_body.mensaje).to.have.property('_id')
    })
})