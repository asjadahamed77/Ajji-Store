import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../redux/slices/productSlice";

const Products = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProductsByCategory(category));
  }, [dispatch, category]);

  const filteredProducts = products?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className='min-h-screen  py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center'>
            <div className="animate-spin rounded-full h-12 w-12 mt-8 border-b-2 border-blue-400 mx-auto"></div>
            <p className="mt-4 text-blue-300">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen  py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center'>
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 md:px-10 py-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder={`Search in ${category}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-blue-200 rounded-md "
        />
      </div>

      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 space-y-2  gap-2 sm:gap-4">
          {filteredProducts.map((item, index) => (
            <Link
              to={`/product/${item._id}`}
              key={index}
              className="sm:p-4 p-2 border border-blue-200 rounded-lg flex flex-col items-center cursor-pointer duration-300 transform hover:-translate-y-2 shadow-amber-50 shadow-md"
            >
              <div className="flex justify-center">
                <img
                  src={item.images[0]?.url}
                  alt="Product"
                 className="w-60 h-60 object-contain bg-white"
                />
              </div>
              <p className="text-blue-200 font-semibold mt-4 capitalize">{item.name}</p>

              {(!Array.isArray(item.variants) || item.variants.length === 0) ? (
                <p className="text-blue-100 font-normal text-sm">
                  Starting at{" "}
                  <span className="font-semibold text-base text-blue-300">
                    Rs.{item.price}
                  </span>
                </p>
              ) : (
                <p className="text-blue-100 font-normal text-sm">
                  Starting at{" "}
                  <span className="font-semibold text-base text-blue-300">
                    Rs.{item.variants[0].price}
                  </span>
                </p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-sm text-blue-200 font-semibold">No products found...</p>
        </div>
      )}
    </div>
  );
};

export default Products;
