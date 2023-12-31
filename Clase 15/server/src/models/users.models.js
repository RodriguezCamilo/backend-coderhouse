import { Schema, model } from "mongoose"
import {cartModel} from './carts.models.js'
import  paginate  from "mongoose-paginate-v2"

const userSchema = Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'user'
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    }
})

userSchema.plugin(paginate)

userSchema.pre('save', async function(next){
    try {
        const newCart = await cartModel.create({})
        this.cart = newCart._id
    } catch (error) {
        next(error)
    }
})

export const userModel = model('users', userSchema)