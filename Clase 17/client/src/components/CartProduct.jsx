import React from 'react'
import { Divider } from '@nextui-org/react'

function CartProduct({item}) {
  return (
    <div>
        <h2 className='text-xl'>{item?.id_prod?.title} x{item?.quantity}</h2>
        <h3>Price: ${item?.id_prod?.price * item?.quantity}</h3>
        <Divider className='my-2'/>
    </div>
  )
}

export default CartProduct