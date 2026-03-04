import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from "../context/AuthContext";

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const { serverUrl } = useContext(authDataContext);

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true });
      setTotalProducts(products.data.length);

      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true });
      setTotalOrders(orders.data.length);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col md:flex-row">
      {/* Navigation + Sidebar */}
      <Nav />
      <Sidebar />

      {/* Main Content */}
      <div className="w-[78%] h-[100%] flex flex-col gap-5 items-center justify-center overflow-x-hidden absolute  right-2 bottom-[5%] ">
        <h1 className="text-2xl md:text-4xl text-[#afe2f2]">OneCart Admin Panel</h1>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Products Card */}
          <div className="flex-1 text-[#dcfafd] bg-[#0000002e] flex items-center justify-center flex-col gap-4 rounded-lg shadow-sm shadow-black backdrop-blur-lg p-6 border border-[#969595]">
            <p className="text-lg md:text-2xl">Total No. of Products</p>
            <span className="px-6 py-3 bg-[#030e11] rounded-lg border border-[#969595] text-xl md:text-2xl">
              {totalProducts}
            </span>
          </div>

          {/* Orders Card */}
          <div className="flex-1 text-[#dcfafd] bg-[#0000002e] flex items-center justify-center flex-col gap-4 rounded-lg shadow-sm shadow-black backdrop-blur-lg p-6 border border-[#969595]">
            <p className="text-lg md:text-2xl">Total No. of Orders</p>
            <span className="px-6 py-3 bg-[#030e11] rounded-lg border border-[#969595] text-xl md:text-2xl">
              {totalOrders}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
