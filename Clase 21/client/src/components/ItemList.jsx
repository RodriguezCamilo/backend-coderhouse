import React from "react"
import { Item } from "./Item"

export function ItemList({ items }) {
    return (
        <section className="grid place-items-center xl:grid-cols-5">
            <div className="grid xl:col-span-3 xl:col-start-2 grid-cols-4 gap-4 justify-items-around w-full place-items-center">
                {items.itemList.map((item) => <Item item={item} key={item._id} />)}
            </div>
        </section>
    )
}