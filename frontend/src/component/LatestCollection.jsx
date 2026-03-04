import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  const { products } = useContext(shopDataContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    console.log(products)
    setLatestProducts(products.slice(0, 8))
  }, [products])

  return (
    <div className="w-full mt-12">
      {/* Title */}
      <div className="text-center mb-6">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-full mx-auto text-xs md:text-lg px-4 text-blue-100">
          Step Into Style – New Collection Dropping This Season!
        </p>
      </div>

      {/* Cards */}
    <div className="w-full flex flex-wrap items-center justify-center gap-6 md:gap-12">
  {latestProducts.map((item, index) => (
    <Card 
      key={index} 
      name={item.name} 
      image={item.image1} 
      id={item._id} 
      mrp={item.mrp} 
      discount={item.discount} 
      tax={item.tax} 
    />
  ))}
</div>

    </div>
  )
}

export default LatestCollection
