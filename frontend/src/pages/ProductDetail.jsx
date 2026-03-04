import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';

function ProductDetail() {
  let { productId } = useParams()
  let { products, currency, addtoCart, loading } = useContext(shopDataContext)
  let [productData, setProductData] = useState(null)

  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [size, setSize] = useState('')

  const getFinalPrice = (item) => {
  const mrp = item.mrp || 0;
  const discount = item.discount || 0; // percentage
  const tax = item.tax || 0; // percentage

  // Apply discount
  const discounted = mrp - (mrp * discount / 100);

  // Apply tax
  const finalPrice = discounted + (discounted * tax / 100);

  return finalPrice.toFixed(2);
};


  useEffect(() => {
    const found = products.find(item => item._id === productId)
    if (found) {
      setProductData(found)
      setImage1(found.image1)
      setImage2(found.image2)
      setImage3(found.image3)
      setImage4(found.image4)
      setImage(found.image1)
    }
  }, [productId, products])

  if (!productData) return <div className="opacity-0"></div>

  return (
    <div>
      {/* Main Section */}
      <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row gap-6 pt-20 px-4 lg:px-12">
        
        {/* Image Gallery */}
        <div className="flex flex-col lg:flex-row gap-6 lg:w-1/2">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 justify-center">
            {[image1, image2, image3, image4].map((img, idx) => (
              <div key={idx} className="w-16 h-16 md:w-24 md:h-28 bg-slate-300 border rounded-md">
                <img 
                  src={img} 
                  alt="" 
                  className="w-full h-full object-cover rounded-md cursor-pointer" 
                  onClick={() => setImage(img)} 
                />
              </div>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 border rounded-md overflow-hidden">
            <img src={image} alt="" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 flex flex-col gap-4 text-white">
          <h1 className="text-2xl md:text-4xl font-semibold">{productData.name.toUpperCase()}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStarHalfAlt className="text-yellow-400" />
            <p className="text-sm md:text-base font-semibold pl-2">(124)</p>
          </div>

          {/* Price */}
         <p className="text-xl md:text-2xl font-semibold text-green-300">
  {currency} {getFinalPrice(productData)}
</p>

{/* Show original MRP with strikethrough if discount exists */}
{productData.discount > 0 && (
  <p className="text-sm text-gray-400 line-through">
    {currency} {productData.mrp}
  </p>
)}

{/* Show discount and tax info */}
<div className="text-sm text-red-400">
  {productData.discount > 0 && `-${productData.discount}% off`}
</div>
<div className="text-sm text-yellow-300">
  {productData.tax > 0 && `+${productData.tax}% tax`}
</div>


          {/* Description */}
          <p className="text-sm md:text-lg max-w-xl">
            {productData.description} Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style.
          </p>

          {/* Sizes */}
          <div className="mt-4">
            <p className="text-lg md:text-xl font-semibold">Select Size</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button 
                  key={index} 
                  className={`border py-2 px-4 rounded-md ${item === size ? 'bg-black text-blue-400 font-bold' : 'bg-slate-300 text-black'}`} 
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button 
              className="mt-4 bg-[#495b61c9] py-2 px-6 rounded-lg border text-white shadow-md hover:bg-slate-500"
              onClick={() => addtoCart(productData._id, size)}
            >
              {loading ? <Loading /> : "Add to Cart"}
            </button>
          </div>

          {/* Extra Info */}
          <div className="w-full h-px bg-slate-700 my-4"></div>
          <div className="text-sm md:text-base space-y-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="w-full min-h-[50vh] bg-gradient-to-l from-[#141414] to-[#0c2025] px-4 lg:px-12 py-12">
        <div className="flex gap-4 mb-6">
          <p className="border px-5 py-3 text-sm md:text-base text-white">Description</p>
          <p className="border px-5 py-3 text-sm md:text-base text-white">Reviews (124)</p>
        </div>
        <div className="bg-[#3336397c] border text-white text-sm md:text-base lg:text-lg p-4 md:p-8 max-w-4xl">
          Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
    </div>
  )
}

export default ProductDetail
