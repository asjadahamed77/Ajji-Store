import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct, viewProduct } from "../redux/slices/adminSlice";

const ViewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState("");

  const deleteProductHandler = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
    dispatch(viewProduct());
  }, [dispatch]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-US", options).replace(",", "");
  };

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-sm text-blue-200 font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="">
      <div className="xl:px-12 pt-8 px-8 xl:gap-8 w-full">
        <input
          type="text"
          placeholder="search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-blue-200 rounded-md z-20"
        />
      </div>

      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="w-full h-[93vh] grid lg:grid-cols-2 grid-cols-1 place-items-stretch xl:p-12 p-8 xl:gap-8 gap-4 overflow-y-scroll ">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-blue-800/10 rounded-lg backdrop-blur-3xl shadow shadow-amber-50 md:p-8 p-4 hover:backdrop-brightness-50 duration-300 transition-all"
            >
              {/* Product Images */}
              <div className="grid grid-cols-3 items-start w-fit gap-6">
                {product.images.map((image, index) => (
                  <div key={index}>
                    <img
                      className="w-20 h-20 object-cover rounded shadow-md shadow-amber-50"
                      src={image.url}
                      alt="image"
                    />
                  </div>
                ))}
              </div>

              {/* Product Info */}
              <div className="text-blue-200 my-6">
                <p className="font-medium text-xl capitalize">{product.name}</p>
                <div className="grid grid-cols-2 border my-4 border-blue-300">
                  <div className="border-r">
                    <p className="text-sm font-medium p-2">BRAND</p>
                    <p className="text-sm font-medium p-2 border-t">CATEGORY</p>
                    <p className="text-sm font-medium p-2 border-t">DESCRIPTION</p>
                  </div>
                  <div>
                    <p className="text-sm capitalize p-2">{product.brand}</p>
                    <p className="text-sm capitalize p-2 border-t">{product.category}</p>
                    <p className="text-sm capitalize p-2 border-t">{product.description}</p>
                  </div>
                </div>
              </div>

              {/* Product Variants */}
              <div className="text-blue-200 my-6">
                {Array.isArray(product.variants) && product.variants.length > 0 ? (
                  product.variants.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 text-sm border my-4 border-blue-300"
                    >
                      <div className="border-r">
                        <p className="font-medium p-2">STORAGE</p>
                        <p className="font-medium p-2 border-t">COLOR</p>
                        <p className="font-medium p-2 border-t">PRICE</p>
                        <p className="font-medium p-2 border-t">IN STOCK</p>
                      </div>
                      <div>
                        <p className="p-2">{item.storage} GB</p>
                        <p className="p-2 border-t">{item.color}</p>
                        <p className="p-2 border-t">Rs.{item.price}</p>
                        <p className="p-2 border-t">{item.stock}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-2 text-sm border my-4 text-blue-200 border-blue-300">
                    <div className="border-r">
                      <p className="font-medium p-2">PRICE</p>
                      <p className="font-medium p-2 border-t">IN STOCK</p>
                    </div>
                    <div>
                      <p className="p-2">Rs.{product.price}</p>
                      <p className="p-2 border-t">{product.stock}</p>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-blue-300">{formatDate(product.createdAt)}</p>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  onClick={() => navigate(`/edit/${product._id}`)}
                  className="bg-white text-blue-950 font-semibold py-2 rounded-md cursor-pointer hover:opacity-70 duration-300 transition-all"
                >
                  UPDATE PRODUCT
                </button>
                <button
                  onClick={() => deleteProductHandler(product._id)}
                  className="bg-white text-red-500 font-semibold py-2 rounded-md cursor-pointer hover:opacity-70 duration-300 transition-all"
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-sm text-blue-200 font-semibold">No products found...</h1>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
