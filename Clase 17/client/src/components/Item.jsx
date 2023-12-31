import React from "react";
import { Card, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom'


export function Item({ item }) {

    return (
        <Card className="py-3 self-center">
            <h2 className="text-xl">{item.title}</h2>
            <p>${item.price}</p>
            <Button className='place-self-center' as={Link} to={`/detail/${item._id}`} color='primary'>Details</Button>
        </Card>
    )
}