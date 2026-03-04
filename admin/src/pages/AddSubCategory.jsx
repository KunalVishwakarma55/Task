import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { authDataContext } from "../context/AuthContext"; // adjust path if needed
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";

function AddSubCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  let { serverUrl } = useContext(authDataContext);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let result = await axios.get(serverUrl + "/api/category/getcategories", {
          withCredentials: true,
        });
        setCategories(result.data); // assuming backend returns array of categories
      } catch (error) {
        console.error(error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, [serverUrl]);

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let payload = {
        categoryId: selectedCategory,
        name,
      };

      let result = await axios.post(
        serverUrl + "/api/subcategory/addsubcategory",
        payload,
        { withCredentials: true }
      );

      toast.success("SubCategory added successfully!");
      setName("");
      setSelectedCategory("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add subcategory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex items-center justify-center">
        <Nav/>
    <Sidebar/>
       <div className="w-[78%] h-[100%] flex items-center justify-start overflow-x-hidden absolute  right-2 bottom-[5%] ">
        <form
        onSubmit={handleAddSubCategory}
        className="w-[100%] md:w-[50%] flex flex-col gap-6 bg-slate-800 p-10 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold">Add SubCategory</h2>

        {/* Select Category */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">Select Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
            className="w-full h-[40px] rounded-lg border-[2px] bg-slate-600 px-[20px] text-[18px]"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* SubCategory Name */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">SubCategory Name</label>
          <input
            type="text"
            placeholder="e.g. Mobiles, TopWear"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-[40px] rounded-lg border-[2px] bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-[160px] px-[20px] py-[12px] rounded-xl ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#65d8f7]"
          } text-black font-semibold`}
        >
          {loading ? "Adding..." : "Add SubCategory"}
        </button>
      </form>
       </div>
    </div>
  );
}

export default AddSubCategory;
