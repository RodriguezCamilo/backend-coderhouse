import {expect} from 'chai'
import mongoose from "mongoose";
import "dotenv/config"
import {userModel} from "../src/models/users.models.js"

await mongoose.connect(process.env.MONGODB_URL)

describe('Test CRUD Users con chai en api/users', function () {

    before(() => {
        console.log("Iniciando el testcon chai")
    })


    it('Obtener todos los usuarios mediante GET', async () => {
        const users = await userModel.find()

        expect(users).not.to.be.deep.equal([])
    })

    it('Obtener un usuario mediante GET', async () => {
        const user = await userModel.findById('65165b177d74b80bf8b03fd2')

        expect(user).to.have.property('_id')
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

        expect(user).to.have.property('_id')
    })

    it('Actualizar un usuario mediante PUT', async () => {
        const udpateUser = {
            firstName: "Kam",
            lastName: "Dev",
            email: "kam@dev.com",
            password: "@dfh234dx@"
        }

        const user = await userModel.findByIdAndUpdate("6598700255616e238bbf2256", udpateUser)

        expect(user).to.have.property('_id')
    })

    it('Eliminar un usuario mediante DELETE', async () => {

        const resultado = await userModel.findByIdAndDelete("6598700255616e238bbf2256")

        expect(resultado).to.be.ok
    })

})