import ItemCount from "./ItemCount";
import { Card, CardHeader, CardFooter, CardBody, Divider } from "@nextui-org/react";
import { LoggedContext } from '../context/LoggedContext.jsx';

import { React, useContext } from 'react'

function ItemDetail({ _id, title, description, price, stock }) {

  const { isLogged, userInfo } = useContext(LoggedContext)

  const onAdd = async (contador) => {
    const itemToAdd = {
      quantity: contador
    }

    const cart = userInfo.user.cart

    try {
      await fetch(`http://localhost:4000/api/carts/${cart}/products/${_id}`, {
        method: 'PUT',
        headers: {
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
    <Card className="h-[75vh] self-center w-[75vw]">
      <CardHeader className='flex justify-center'>
        <h2 className='text-3xl font-bold'>{title}</h2>
      </CardHeader>
      <CardBody className='flex text-center justify-center overflow-hidden'>
        <p>{description}</p>
      </CardBody>
      <CardFooter className='grid'>
        <h3 className="text-2xl" >${price}</h3>
        <Divider className="my-3" />
        {isLogged ? <ItemCount stock={stock} onAdd={onAdd} /> : <b className="text-2xl">Sign in to buy!</b>}
      </CardFooter>
    </Card>
  )
}

export default ItemDetail