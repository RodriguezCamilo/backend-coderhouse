import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ItemDetail from './ItemDetail';
import { Spinner } from '@nextui-org/react';

function ItemDetailContainer() {
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState(null);
  const { itemId } = useParams();

  useEffect(() => {
    const handleFetch = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:3000/api/products/${itemId}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json()
          setItemData(data.mensaje)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    };

    handleFetch()
  }, [itemId])

  return (
    loading ? (
      <Spinner color='primary' className='place-self-center' />
    ) : (
      <ItemDetail {...itemData} />
    )
  );
}

export default ItemDetailContainer;