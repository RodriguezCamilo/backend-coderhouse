import React from "react";
import { Card } from "@nextui-org/react";


export function Item({ item }) {
    return (
        <Card className="py-3 self-center">
            <h2 className="text-xl">{item.title}</h2>
            <p>${item.price}</p>
        </Card>
    )
}