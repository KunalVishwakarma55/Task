import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
    let [orderData,setOrderData] = useState([])
    let {currency} = useContext(shopDataContext)
    let {serverUrl} = useContext(authDataContext)

    const loadOrderData = async () => {
       try {
      const result = await axios.post(serverUrl + '/api/order/userorder',{},{withCredentials:true})
      if(result.data){
        let allOrdersItem = []
        result.data.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
    }

useEffect(()=>{
 loadOrderData()
},[])


  return (
    <div className="w-full min-h-screen p-4 pb-24 bg-gradient-to-l from-[#141414] to-[#0c2025]">
  {/* Title */}
  <div className="text-center mt-20">
    <Title text1="MY" text2="ORDER" />
  </div>

  {/* Orders List */}
  <div className="w-full mt-8 flex flex-col gap-6">
    {orderData.map((item, index) => (
      <div key={index} className="w-full border-t border-b py-4">
        <div className="flex flex-col md:flex-row items-start gap-4 bg-[#51808048] p-4 rounded-2xl">
          
          {/* Product Image */}
          <img src={item.image1} alt="" className="w-28 h-28 md:w-32 md:h-32 rounded-md object-cover" />

          {/* Product Info */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-lg md:text-xl text-[#f3f9fc] font-semibold">{item.name}</p>
            
            <div className="flex flex-wrap gap-4 text-sm md:text-base text-[#aaf4e7]">
              <p>{currency} {item.mrp}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Size: {item.size}</p>
            </div>

            <p className="text-sm md:text-base text-[#aaf4e7]">
              Date: <span className="text-[#e4fbff] pl-2">{new Date(item.date).toDateString()}</span>
            </p>

            <p className="text-sm md:text-base text-[#aaf4e7]">
              Payment Method: {item.paymentMethod}
            </p>

            {/* Status + Track Order */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-xs md:text-sm text-[#f3f9fc]">{item.status}</p>
              </div>
              <button 
                className="px-3 py-2 md:px-4 md:py-2 rounded-md bg-[#101919] text-[#f3f9fc] text-xs md:text-sm hover:bg-slate-600"
                onClick={loadOrderData}
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default Order
