import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({ category, subCategory, currentProductId }) {
  const { products } = useContext(shopDataContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice()
      productsCopy = productsCopy.filter(item => category === item.category)
      productsCopy = productsCopy.filter(item => subCategory === item.subCategory)
      productsCopy = productsCopy.filter(item => currentProductId !== item._id)
      setRelated(productsCopy.slice(0, 4))
    }
  }, [products, category, subCategory, currentProductId])

  return (
    <div className="w-full min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] py-12 px-4 md:px-12">
  <div className="mb-6">
    <Title text1="RELATED" text2="PRODUCTS" />
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-15">
    {related.map((item, index) => (
      <Card 
        key={index} 
        id={item._id} 
        name={item.name} 
        mrp={item.mrp} 
        discount={item.discount} 
        tax={item.tax} 
        image={item.image1} 
      />
    ))}
  </div>
</div>

  )
}

export default RelatedProduct
