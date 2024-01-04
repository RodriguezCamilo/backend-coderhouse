import React from "react"
import { Item } from "./Item"

export function ItemList({ items }) {
    console.log(items)
    return (
        <section className="grid place-items-center">
            <div className="grid grid-cols-4 gap-4 justify-items-around w-1/2">
                {items.itemList.map((item) => <Item item={item} key={item._id} />)}
            </div>
        </section>
    )
}