import ItemCount from "./ItemCount";
import { Card, CardHeader, CardFooter, CardBody, Divider } from "@nextui-org/react";
import { LoggedContext } from '../context/LoggedContext.jsx';

import { React, useContext } from 'react'

function ItemDetail({ _id, title, description, price, stock, thumbnail }) {

  const { isLogged, userInfo, token } = useContext(LoggedContext)

  const onAdd = async (contador) => {
    const itemToAdd = {
      quantity: contador
    }

    const cart = userInfo.user.cart

    try {
      await fetch(`http://localhost:4000/api/carts/${cart}/products/${_id}`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(itemToAdd)
      })
        .then(async response => {
          if (response.ok) {
            const res = await response.json()
          }
        })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Card className="self-center max-w-[90vw] h-[70vh]">
      <CardBody className=' text-center justify-center overflow-hidden grid grid-cols-2'>
        <div>
          <img className="rounded-lg aspect-square object-contain object-center" src={thumbnail[0]} alt="Foto del producto" />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className='text-3xl font-bold'>{title}</h2>
          <p className="text-lg font-semibold">{description}</p>
          <h3 className="text-5xl font-semibold" >${price}</h3>
          {isLogged ? <ItemCount stock={stock} onAdd={onAdd} /> : <b className="text-2xl underline font-semibold">Sign in to buy!</b>}
        </div>
      </CardBody>
    </Card>
  )
}

export default ItemDetail