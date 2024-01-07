import { createContext, useContext, useState, useEffect } from "react";
import { LoggedContext } from '../context/LoggedContext.jsx';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const { userInfo, token } = useContext(LoggedContext)
    const cart = userInfo?.user?.cart

    const [cartData, setCartData] = useState([])
    const [total, setTotal] = useState(0)
    const [ticketData, setTicketData] = useState(null)

    const handleCart = async () => {
        await fetch(`http://localhost:3000/api/carts/${cart}`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            }
        })
            .then(async response => {
                if (response.ok) {
                    let data = await response.json()
                    setCartData(data.mensaje.products)
                }
            })
    }

    const handleTotal = () => {
        let data = 0
        for (let index = 0; index < cartData.length; index++) {
            let individual = cartData[index].quantity * cartData[index].id_prod.price
            data += individual
        }
        if(userInfo?.user?.rol == 'premium') {
            data = data * 0.9
        }
        setTotal(data)
    }

    const handleEmpty = async () => {
        await fetch(`http://localhost:3000/api/carts/${cart}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            }
        })
            .then(async response => {
                if (response.ok) {
                    let data = await response.json()
                    console.log(data.mensaje)
                }
            })
    }

    const handlePurchase = async () => {
        await fetch(`http://localhost:3000/api/carts/${cart}/purchase`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(async response => {
                if (response.ok) {
                    let res = await response.json()
                    await setTicketData(res)
                }
            })

    }

    return (
        <CartContext.Provider value={{ cartData, setCartData, total, setTotal, handleTotal, handleCart, handleEmpty, handlePurchase, ticketData }}>
            {children}
        </CartContext.Provider>
    )

}