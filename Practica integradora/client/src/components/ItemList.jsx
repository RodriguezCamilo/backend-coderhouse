import React from "react"
import { Item } from "./Item"

export function ItemList({ items }) {
    return (
        <section className="w-[90vw] justify-items-stretch content-center">
            <div className="grid grid-cols-4 gap-2 justify-items-stretch content-center">
                {items.itemList.map((item) => <Item item={item} key={item._id} />)}
            </div>
        </section>
    )
}