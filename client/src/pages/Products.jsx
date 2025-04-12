import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductsByCategory } from "../redux/slices/productSlice";

const Products = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByCategory(category));
  }, [dispatch, category]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 px-2 md:px-6 lg:px-10 py-8 gap-4">
      {products.map((item, index) => (
        <Link 
        to={`/product/${item._id}`}
          key={index}
          className="p-4 border border-blue-200 rounded-lg flex flex-col items-center cursor-pointer duration-300 transform hover:-translate-y-2 shadow-amber-50 shadow-md"
        >
          <div className="flex justify-center">
            <img
              src={item.images[0].url}
              alt="Phone"
              className="w-[150px] h-[200px] object-cover"
            />
          </div>
          <p className="text-blue-200 font-semibold mt-4 capitalize">{item.name}</p>
         {
            (!Array.isArray(item.variants) || item.variants.length === 0) && <p className="text-blue-100 font-normal text-sm">Starting at <span className="font-semibold text-base text-blue-300" >Rs.{item.price}</span></p>
         }
         {
            Array.isArray(item.variants) && item.variants.length > 0 && <p className="text-blue-100 font-normal text-sm">Starting at <span className="font-semibold text-base text-blue-300" >Rs.{item.variants[0].price}</span></p>

         }
        </Link>
      ))}
    </div>
  );
};

export default Products;
