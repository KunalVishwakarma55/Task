import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { authDataContext } from "../context/AuthContext";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";

function AddCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  let { serverUrl } = useContext(authDataContext);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        serverUrl + "/api/category/addcategory",
        { name },
        { withCredentials: true }
      );

      toast.success("Category added successfully!");
      setName("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col md:flex-row">
      {/* Navigation + Sidebar */}
      <Nav />
      <Sidebar />

      {/* Form Section */}
      <div className="w-[78%] h-[100%] flex items-center justify-start overflow-x-hidden absolute  right-2 bottom-[5%] ">
        <form
          onSubmit={handleAddCategory}
          className="w-full max-w-md flex flex-col gap-6 bg-slate-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl md:text-2xl font-bold text-center">Add Category</h2>

          {/* Category Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-lg font-semibold">Category Name</label>
            <input
              type="text"
              placeholder="e.g. Electronics"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-12 rounded-lg border-2 bg-slate-600 px-4 text-base md:text-lg placeholder:text-[#ffffffc2]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#65d8f7]"
            } text-black font-semibold text-base md:text-lg`}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
