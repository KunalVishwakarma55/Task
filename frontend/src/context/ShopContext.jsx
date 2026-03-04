import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { userDataContext } from './UserContext'
import { toast } from 'react-toastify'

export const shopDataContext = createContext()

function ShopContext({ children }) {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItem, setCartItem] = useState({})
  const [loading, setLoading] = useState(false)

  const { userData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)

  const currency = '₹'
  const delivery_fee = 40

  // ✅ Helper: calculate final price with discount + tax
  const getFinalPrice = (product) => {
    const mrp = product.mrp || 0
    const discount = product.discount || 0
    const tax = product.tax || 0

    const discounted = mrp - (mrp * discount / 100)
    const finalPrice = discounted + (discounted * tax / 100)

    return finalPrice
  }

  // ✅ Fetch products
  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list")
      setProducts(result.data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  // ✅ Add to cart
  const addtoCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size")
      return
    }

    let cartData = structuredClone(cartItem)

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1
    } else {
      cartData[itemId] = { [size]: 1 }
    }

    setCartItem(cartData)

    if (userData) {
      setLoading(true)
      try {
        await axios.post(serverUrl + "/api/cart/add", { itemId, size }, { withCredentials: true })
        toast.success("Product Added")
      } catch (error) {
        console.error("Add Cart Error:", error)
        toast.error("Add Cart Error")
      } finally {
        setLoading(false)
      }
    }
  }

  // ✅ Get user cart from backend
  const getUserCart = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true })
      setCartItem(result.data)
    } catch (error) {
      console.error("Error fetching user cart:", error)
    }
  }

  // ✅ Update quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem)
    cartData[itemId][size] = quantity
    setCartItem(cartData)

    if (userData) {
      try {
        await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
      } catch (error) {
        console.error("Error updating cart:", error)
      }
    }
  }

  // ✅ Get cart count
  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItem) {
      for (const size in cartItem[items]) {
        if (cartItem[items][size] > 0) {
          totalCount += cartItem[items][size]
        }
      }
    }
    return totalCount
  }

  // ✅ Get cart amount (with discount + tax)
  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItem) {
      const product = products.find(p => p._id === items)
      if (!product) continue

      for (const size in cartItem[items]) {
        const quantity = cartItem[items][size]
        if (quantity > 0) {
          totalAmount += getFinalPrice(product) * quantity
        }
      }
    }
    return totalAmount
  }

  // ✅ Fetch products & cart on mount
  useEffect(() => { getProducts() }, [])
  useEffect(() => { getUserCart() }, [])

  const value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount,
    loading
  }

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext
