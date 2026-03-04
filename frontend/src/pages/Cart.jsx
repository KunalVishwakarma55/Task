import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
    const { products, currency, cartItem ,updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()
   const getFinalPrice = (product) => {
    const mrp = product.mrp || 0
    const discount = product.discount || 0
    const tax = product.tax || 0

    const discounted = mrp - (mrp * discount / 100)
    const finalPrice = discounted + (discounted * tax / 100)

    return finalPrice.toFixed(2)
  }



  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData); 

  }, [cartItem]);
  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] '>
      <div className='h-[8%] w-[100%] text-center mt-[80px]'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

       <div className="w-full mt-8 flex flex-col gap-6">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id)
          return (
            <div key={index} className="w-full border-t border-b py-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-[#51808048] p-4 rounded-2xl relative">
                
                {/* Product Image */}
                <img className="w-24 h-24 rounded-md object-cover" src={productData.image1} alt="" />

                {/* Product Info */}
                <div className="flex flex-col gap-2 flex-1">
                  <p className="text-lg md:text-xl text-[#f3f9fc] font-semibold">{productData.name}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      {/* Show original MRP if discount exists */}
                      {productData.discount > 0 && (
                        <p className="text-sm text-gray-400 line-through">
                          {currency} {productData.mrp}
                        </p>
                      )}
                      {/* Final price */}
                      <p className="text-base md:text-lg text-green-300 font-semibold">
                        {currency} {getFinalPrice(productData)}
                      </p>
                      {/* Discount & Tax labels */}
                      {productData.discount > 0 && (
                        <span className="text-xs text-red-400">-{productData.discount}% off</span>
                      )}
                      {productData.tax > 0 && (
                        <span className="text-xs text-yellow-300">+{productData.tax}% tax</span>
                      )}
                    </div>

                    {/* Size */}
                    <p className="w-10 h-10 text-sm text-white bg-[#518080b4] rounded-md flex items-center justify-center border border-[#9ff9f9]">
                      {item.size}
                    </p>
                  </div>
                </div>

                {/* Quantity Input */}
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="w-16 md:w-20 px-2 py-1 text-white text-base font-semibold bg-[#518080b4] border border-[#9ff9f9] rounded-md"
                  onChange={(e) =>
                    (e.target.value === '' || e.target.value === '0')
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                />

                {/* Delete Icon */}
                <RiDeleteBin6Line
                  className="text-[#9ff9f9] w-6 h-6 cursor-pointer"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          )
        })}
      </div>



      <div className='flex justify-start items-end my-20'>
        <div className='w-full sm:w-[450px]'>
            <CartTotal/>
            <button className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px]  border-[1px] border-[#80808049] ml-[30px] mt-[20px]' onClick={()=>{
                if (cartData.length > 0) {
      navigate("/placeorder");
    } else {
      console.log("Your cart is empty!");
    }
            }}>
                PROCEED TO CHECKOUT
            </button>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
