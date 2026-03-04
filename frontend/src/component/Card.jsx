import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({ name, image, id, mrp, discount = 0, tax = 0 }) {
  const { currency } = useContext(shopDataContext)
  const navigate = useNavigate()

  // Calculate final price
  const discountedPrice = mrp - (mrp * discount / 100)
  const finalPrice = discountedPrice + (discountedPrice * tax / 100)

  return (
    <div 
      className="w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[102%] flex flex-col p-3 cursor-pointer border border-[#80808049]" 
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      <img src={image} alt={name} className="w-full h-[70%] rounded-sm object-cover" />
      
      <div className="text-[#c3f6fa] text-lg font-semibold mt-2 truncate">
  {name}
</div>

      
      {/* Price Section */}
      <div className="flex flex-col mt-1 text-sm text-white">
        {discount > 0 && (
          <span className="line-through opacity-70">
            {currency} {mrp.toFixed(2)}
          </span>
        )}
        <span className="text-base font-bold text-green-300">
          {currency} {finalPrice.toFixed(2)}
        </span>
        {discount > 0 && (
          <span className="text-xs text-red-400">-{discount}% off</span>
        )}
        {tax > 0 && (
          <span className="text-xs text-yellow-300">+{tax}% tax</span>
        )}
      </div>
    </div>
  )
}

export default Card
