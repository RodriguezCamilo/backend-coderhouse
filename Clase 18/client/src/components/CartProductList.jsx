import React from 'react'
import CartProduct from './CartProduct'

function CartProductList({ items }) {
    return (
        <>
            {items.cartData.map((item) => <CartProduct item={item} key={item?.id_prod?._id} />)}
        </>
    )
}

export default CartProductList