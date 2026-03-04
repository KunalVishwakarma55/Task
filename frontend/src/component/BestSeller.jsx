import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
  const { products } = useContext(shopDataContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const filterProduct = products.filter(item => item.bestseller)
    setBestSeller(filterProduct.slice(0, 4))
  }, [products])

  return (
    <div className="w-full mt-12">
      {/* Title */}
      <div className="text-center mb-6">
        <Title text1="BEST" text2="SELLER" />
        <p className="w-full mx-auto text-xs md:text-lg px-4 text-blue-100">
          Tried, Tested, Loved – Discover Our All-Time Best Sellers.
        </p>
      </div>

      {/* Cards */}
      <div className="w-full flex flex-wrap items-center justify-center gap-6 md:gap-12">
        {bestSeller.map((item, index) => (
          <Card key={index} name={item.name} image={item.image1} id={item._id} mrp={item.mrp} discount={item.discount} tax={item.tax} />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
