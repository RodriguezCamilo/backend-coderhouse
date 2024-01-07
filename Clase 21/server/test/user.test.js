import "dotenv/config"
import mongoose from "mongoose"
import {userModel} from "../src/models/users.models.js"
import Assert from "assert"

const assert = Assert.strict

await mongoose.connect(process.env.MONGODB_URL)

describe('Test CRUD de Usuarios en la ruta api/users', function () {
    before(() => {
        console.log("Iniciando el test")
    })

    it("Obtener todos los usuarios mediante GET", async()=>{
        const users = await userModel.find()

        assert.strictEqual(Array.isArray(users), true)
    })
    it('Obtener un usuario mediante metodo GET', async () => {
        const user = await userModel.findById('65165b177d74b80bf8b03fd2')

        assert.ok(user._id)
    })

    it('Crear un usuario mediante POST', async () => {
        const newUser = {
            firstName: "Kam",
            lastName: "Dev",
            age: 20,
            email: "kam@dev.com",
            password: "@adsfg435sfdcgvb@"
        }

        const user = await userModel.create(newUser)

        assert.ok(user._id)
    })

    it('Actualizar un usuario mediante PUT', async () => {
        const udpateUser = {
            firstName: "Kam",
            lastName: "Dev",
            email: "kam@dev.com",
            password: "@dfh234dx@"
        }

        const user = await userModel.findByIdAndUpdate("6598700255616e238bbf2256", udpateUser)

        assert.ok(user._id)
    })

    it('Eliminar un usuario mediante DELETE', async () => {

        const resultado = await userModel.findByIdAndDelete("657dc1eee6177a8b2a0f8755")

        assert.strictEqual(typeof resultado, 'object')
    })
})