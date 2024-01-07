import React from "react";
import { Card, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom'


export function Item({ item }) {

    return (
        <Card className="p-4 gap-2 h-full flex self-center text-wrap justify-between">
            <h2 className="text-1xl font-bold place-self-center ">{item.title}</h2>
            <img className="rounded-lg object-contain aspect-square object-center place-self-center" src={item.thumbnail[0]} alt="Foto del producto" />
            <div className="flex justify-evenly items-center">
                <p className="font-semibold text-3xl">${item.price}</p>
                <Button className='' as={Link} to={`/detail/${item._id}`} color='primary'>Ver mas</Button>
            </div>
        </Card>
    )
}