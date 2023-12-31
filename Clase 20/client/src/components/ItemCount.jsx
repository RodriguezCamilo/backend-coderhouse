import React from "react"
import { useState } from "react"
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";


const ItemCount = ({ stock = 10, onAdd }) => {

    const [contador, setContador] = useState(1)
    const [clicked, setClicked] = useState(false)

    const sum = () => {
        if (contador === stock) {
            return
        }
        setContador(contador + 1)
    }

    const res = () => {
        if (contador === 1) {
            return
        }
        setContador(contador - 1)
    }

    const add = () => {
        if (stock > 0) {
            setClicked(true)
            onAdd(contador)
        }

    }

    return (
        <>
            {stock > 0
                ? <div className="flex flex-auto justify-center">
                    {clicked ? <Button color="primary" as={Link} to={"/cart"}> Cart </Button> : (<div>
                        <div className="flex flex-auto justify-center">
                            <Button variant="bordered" isIconOnly size="sm" color={contador > 1 ? 'primary' : 'danger'} onClick={() => res()}>-</Button>
                            <h4 className="mx-3 text-lg">{contador}</h4>
                            <Button variant="bordered" isIconOnly size="sm" color={contador === stock ? 'danger' : 'primary'} onClick={() => sum()}>+</Button>
                        </div>
                        <br />
                        <div>
                            <Button color="primary" onClick={() => add()}>Add to cart</Button>
                        </div>
                    </div>)} </div>
                : <h3 className="text-red-600 text-2xl">NO STOCK</h3>
            }
        </>
    )
}

export default ItemCount 
