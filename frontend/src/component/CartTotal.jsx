import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)

  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className="w-full lg:ml-[30px]">
      <div className="text-xl py-[10px]">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890] rounded-lg">
        {/* Subtotal */}
        <div className="flex justify-between text-white text-[18px] p-[10px]">
          <p>Subtotal</p>
          <p>{currency} {subtotal.toFixed(2)}</p>
        </div>
        <hr />

        {/* Shipping Fee */}
        <div className="flex justify-between text-white text-[18px] p-[10px]">
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee.toFixed(2)}</p>
        </div>
        <hr />

        {/* Grand Total */}
        <div className="flex justify-between text-white text-[18px] p-[10px] font-bold">
          <p>Total</p>
          <p>{currency} {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
