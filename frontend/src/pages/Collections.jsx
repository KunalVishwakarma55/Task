import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';
import { authDataContext } from '../context/AuthContext';
import axios from "axios"

function Collections() {

    let [showFilter,setShowFilter] = useState(false)
    let {serverUrl}=useContext(authDataContext)
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    let {products,search,showSearch} = useContext(shopDataContext)
    let [filterProduct,setFilterProduct] = useState([])
    let [category,setCaterory] = useState([])
    let [subCategory,setSubCaterory] = useState([])
    let [sortType,SetSortType] = useState("relavent")

    const toggleCategory = (e) =>{
        if(category.includes(e.target.value)){
            setCaterory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setCaterory(prev => [...prev,e.target.value])
         }
    }

    const toggleSubCategory = (e) =>{
         if(subCategory.includes(e.target.value)){
            setSubCaterory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setSubCaterory(prev => [...prev,e.target.value])
         }
    }

    const getFinalPrice = (item) => {
  let discounted = item.mrp - (item.mrp * (item.discount || 0) / 100);
  return discounted + (discounted * (item.tax || 0) / 100);
};

const applyFilterAndSort = () => {
  let productCopy = products.slice();

  // Search filter
  if (showSearch && search) {
    productCopy = productCopy.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Category filter
  if (category.length > 0) {
    productCopy = productCopy.filter(item => category.includes(item.category));
  }

  // SubCategory filter
  if (subCategory.length > 0) {
    productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
  }

  // Sorting
  switch (sortType) {
    case "low-high":
      productCopy.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
      break;
    case "high-low":
      productCopy.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
      break;
    default:
      // "relavent" → no sorting
      break;
  }

  setFilterProduct(productCopy);
};



    const sortProducts = (e)=>{
        let fbCopy = filterProduct.slice()

        switch(sortType){
         case 'low-high':
            setFilterProduct(fbCopy.sort((a,b)=>(a.price - b.price)))
        break;

         case 'high-low':
            setFilterProduct(fbCopy.sort((a,b)=>(b.price - a.price)))
        break;
        default:
            applyFilterAndSort()
        break;
        }

    }

    useEffect(()=>{
        sortProducts()
    },[sortType])


    useEffect(()=>{
    setFilterProduct(products)
    },[products])

    useEffect(() => {
  applyFilterAndSort();
}, [products, category, subCategory, search, showSearch, sortType]);



    useEffect(() => {
  const fetchCategories = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/category/getcategories", {
        withCredentials: true,
      });
      setCategories(result.data); // array of categories
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };
  fetchCategories();
}, [serverUrl]);

useEffect(() => {
  const fetchSubCategories = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/subcategory/getsubcategories", {
        withCredentials: true,
      });
      setSubCategories(result.data); // array of subcategories
    } catch (error) {
      console.error("Failed to fetch subcategories", error);
    }
  };
  fetchSubCategories();
}, [serverUrl]);







  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row pt-[70px] pb-[110px] overflow-x-hidden">
  
  {/* Sidebar Filters */}
  <div className={`w-full md:w-1/3 lg:w-1/5 p-5 border-r border-gray-400 text-[#aaf5fa] ${showFilter ? "h-auto" : "h-[8vh]"} md:min-h-screen`}>
    <p 
      className="text-xl md:text-2xl font-semibold flex gap-2 items-center cursor-pointer" 
      onClick={() => setShowFilter(prev => !prev)}
    >
      FILTERS
      {!showFilter && <FaChevronRight className="text-lg md:hidden" />}
      {showFilter && <FaChevronDown className="text-lg md:hidden" />}
    </p>

    {/* Categories */}
    <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>
      <p className="text-lg text-[#f8fafa]">CATEGORIES</p>
      <div className="flex flex-col gap-2">
        {categories.map(cat => (
          <label key={cat._id} className="flex items-center gap-2 text-sm md:text-base">
            <input
              type="checkbox"
              value={cat._id}
              className="w-3"
              onChange={toggleCategory}
            /> {cat.name}
          </label>
        ))}
      </div>
    </div>

    {/* SubCategories */}
    <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>
      <p className="text-lg text-[#f8fafa]">SUB-CATEGORIES</p>
      <div className="flex flex-col gap-2">
        {subCategories.map(sub => (
          <label key={sub._id} className="flex items-center gap-2 text-sm md:text-base">
            <input
              type="checkbox"
              value={sub._id}
              className="w-3"
              onChange={toggleSubCategory}
            /> {sub.name}
          </label>
        ))}
      </div>
    </div>
  </div>

  {/* Product Section */}
  {/* Products */}
  <div className="flex-1 md:py-4">
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-12">
  <Title text1="ALL" text2="COLLECTIONS" />
  
  <select 
    className="bg-slate-600 w-full md:w-[200px] h-12 px-3 text-white rounded-lg border-2 hover:border-[#46d1f7]" 
    onChange={(e) => SetSortType(e.target.value)}
  >
    <option value="relavent">Sort By: Relevant</option>
    <option value="low-high">Sort By: Low to High</option>
    <option value="high-low">Sort By: High to Low</option>
  </select>
</div>


    {/* Product Grid */}
    <div className="w-full min-h-[70vh] mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 lg:px-12">
      {filterProduct.map((item, index) => (
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
</div>



  )
}

export default Collections