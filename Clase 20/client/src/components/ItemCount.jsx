import React from "react"
import { useState } from "react"
import { Button, Card } from "@nextui-org/react";
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
                ? <div className="flex w-full">
                    {clicked ? <Button color="primary" as={Link} to={"/cart"}> Cart </Button> : (
                        <div className="w-full mx-2">
                            <Card className="flex flex-row justify-evenly items-center p-2 ">
                                <div className="flex flex-row gap-4">
                                    <Button variant="bordered" isIconOnly size="sm" color={contador > 1 ? 'primary' : 'danger'} onClick={() => res()}>-</Button>
                                    <h4 className="font-semibold text-xl">{contador}</h4>
                                    <Button variant="bordered" isIconOnly size="sm" color={contador === stock ? 'danger' : 'primary'} onClick={() => sum()}>+</Button>
                                </div>
                                <div>
                                    <Button color="primary" className="font-semibold text-lg" onClick={() => add()}>Add to cart</Button>
                                </div>

                            </Card>
                        </div>)}
                </div>
                : <h3 className="text-red-600 text-2xl">NO STOCK</h3>
            }
        </>
    )
}

export default ItemCount 
