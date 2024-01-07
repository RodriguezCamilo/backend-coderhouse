import React from 'react'
import { useEffect, useState } from 'react'
import { ItemList } from './ItemList'

export default function Home() {

  const [itemList, setItemList] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/products/?limit=8', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(async response => {
        if (response.ok) {
          let data = await response.json()
          setItemList(data.respuesta.payload)
        }
      })
  },[])

  return (
    <ItemList items={{ itemList }} />
  )
}