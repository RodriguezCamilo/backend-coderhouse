import "dotenv/config"

import {expect} from 'chai'
import mongoose from "mongoose"
import supertest from "supertest"

const requester = supertest('http://localhost:3000')

await mongoose.connect(process.env.MONGODB_URL)

describe('Test Users Session api/session', function () {
    this.timeout(15000)
    let cookie = {}

    /* it("Ruta: api/session/register con metodo POST", async () => {
        const newUser = {
            firstName: "Kam",
            lastName: "Dev",
            age: 18,
            email: "dev@kam.com",
            password: "kam"
        }

        const { _body } = await requester.post('/api/session/register').send(newUser)

        console.log(_body)
        expect(_body).to.be.ok
    }) */

    it("Ruta: api/session/login con metodo POST", async () => {
        const user = {
            email: "dev@kam.com",
            password: "kam"
        }

        const resultado = await requester.post('/api/session/login').send(user)
        const cookieResult = resultado._body.token
        console.log(cookieResult)
        expect(cookieResult).to.be.ok
        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1]
        }

        expect(cookie.name).to.be.ok.and.equal('connect.sid')
        expect(cookie.value).to.be.ok
    })

    /*it("Ruta: api/session/current con metodo GET", async () => {

        const { _body } = await requester.get('/api/session/current')
            .set('Cookie', [`${cookie.name}=${cookie.value}`])

        console.log(_body)

        expect(_body.payload.email).to.be.equal('san@san.com')
    })*/

})