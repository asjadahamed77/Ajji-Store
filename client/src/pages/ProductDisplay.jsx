import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from '../redux/slices/productSlice';
import { addToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import  { useNavigate } from "react-router-dom"

const ProductDisplay = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleProduct, loading, error } = useSelector((state) => state.products);
  const userId = useSelector((state) => state.auth?.user?._id);

  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const imageRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [filteredVariant, setFilteredVariant] = useState(null);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct?.images?.length > 0) {
      setSelectedImage(singleProduct.images[0]);
    }

    if (singleProduct?.variants?.length > 0) {
      const defaultVariant = singleProduct.variants[0];
      setSelectedColor(defaultVariant.color);
      setSelectedStorage(defaultVariant.storage);
      setFilteredVariant(defaultVariant);

      if (defaultVariant.stock === 0) {
        toast.error("Selected variant is out of stock");
      }
    }
  }, [singleProduct]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({ backgroundPosition: `${x}% ${y}%` });
  };

  const handleMouseLeave = () => setZoomStyle({});

  const handleVariantSelect = (color = null, storage = null) => {
    const finalColor = color ?? selectedColor;
    const finalStorage = storage ?? selectedStorage;

    if (color) setSelectedColor(color);
    if (storage) setSelectedStorage(storage);

    const match = singleProduct.variants.find(
      (v) => v.color === finalColor && v.storage === finalStorage
    );

    if (match) {
      setFilteredVariant(match);
      if (match.stock === 0) {
        toast.error("Selected variant is out of stock");
      }
    } else {
      setFilteredVariant(null);
    }
  };

  const handleAddToCart = () => {
    if (!filteredVariant && singleProduct.variants?.length > 0) {
      toast.error("Please select a valid color and storage option.");
      return;
    }

    if (filteredVariant?.stock === 0) {
      toast.error("Selected variant is out of stock");
      return;
    }

    const cartData = {
      productId: singleProduct._id,
      quantity: 1,
      color: selectedColor,
      storage: selectedStorage,
    };

    dispatch(addToCart(cartData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate('/cart')
      }
    });
  };

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

  const hasVariants = singleProduct?.variants?.length > 0;

  return singleProduct && (
    <div>
      <div className='flex flex-col lg:flex-row sm:px-20 px-4 py-8 gap-8'>
        {/* Images Section */}
        <div className='flex-1 flex flex-col gap-8 items-center'>
          <div
            className='p-4 relative w-full max-w-[400px] h-[400px]'
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={imageRef}
              className="w-full h-full bg-white border border-blue-200 bg-no-repeat bg-cover bg-center transition duration-300"
              style={{
                backgroundImage: `url(${selectedImage?.url})`,
                backgroundSize: zoomStyle.backgroundPosition ? '200%' : 'contain',
                ...zoomStyle,
              }}
            />
          </div>

          <div className='flex overflow-x-auto gap-4 w-full max-w-[400px] justify-center'>
            {singleProduct.images.map((item, index) => (
              <img
                key={index}
                src={item.url}
                onClick={() => setSelectedImage(item)}
                className={`w-20 h-20 border p-1 cursor-pointer duration-200 ${
                  selectedImage?.url === item.url ? 'border-red-400' : 'border-blue-200'
                }`}
                alt="Product"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className='flex-1 text-blue-200'>
          <h2 className='text-2xl font-semibold mb-4 capitalize'>{singleProduct.name}</h2>
          <p className='md:w-[75%] w-[85%] text-sm font-normal text-blue-100 mb-4'>
            {singleProduct.description}
          </p>
          <p className='text-sm font-normal text-blue-100 mb-4'>
            Brand: <span>{singleProduct.brand}</span>
          </p>

          {/* Variants Section */}
          {hasVariants ? (
            <>
              <p className='font-medium mt-4'>Select Colour</p>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 w-fit'>
                {[...new Set(singleProduct.variants.map(v => v.color))].map((color, index) => (
                  <div
                    key={index}
                    onClick={() => handleVariantSelect(color, null)}
                    className={`w-fit p-2 border cursor-pointer rounded mt-2 transition-all duration-300 ${
                      selectedColor === color ? 'bg-white text-blue-950' : 'border-blue-200 hover:bg-white hover:text-blue-950'
                    }`}
                  >
                    <p className='text-sm capitalize'>{color}</p>
                  </div>
                ))}
              </div>

              <p className='font-medium mt-4'>Select Storage</p>
              <div className='grid grid-cols-3 gap-2 w-fit'>
                {[...new Set(
                  singleProduct.variants
                    .filter(v => v.color === selectedColor)
                    .map(v => v.storage)
                )].map((storage, index) => (
                  <div
                    key={index}
                    onClick={() => handleVariantSelect(null, storage)}
                    className={`w-fit p-2 border cursor-pointer rounded mt-2 transition-all duration-300 ${
                      selectedStorage === storage ? 'bg-white text-blue-950 ' : 'border-blue-200 hover:bg-white hover:text-blue-950'
                    }`}
                  >
                    <p className='text-sm capitalize'>{storage} GB</p>
                  </div>
                ))}
              </div>

              {/* Price and Stock */}
              {filteredVariant && (
                <p className='text-lg mt-4 font-semibold'>
                  Price: Rs.{filteredVariant.price.toLocaleString()}
                </p>
              )}
              {filteredVariant?.stock === 0 && (
                <p className="text-red-400 mt-2">Out of stock</p>
              )}
            </>
          ) : (
            <>
              <p className='text-lg mt-4 font-semibold'>
                Price: Rs.{singleProduct.price?.toLocaleString()}
              </p>
              {singleProduct.stock === 0 && (
                <p className="text-red-400 mt-2">Out of stock</p>
              )}
            </>
          )}

          <button
            className='w-fit px-12 py-2 rounded border mt-4 font-semibold cursor-pointer hover:bg-white hover:text-blue-950 duration-300 transition-all'
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Specifications */}
      <div className='flex justify-center my-8 px-6'>
        {Array.isArray(singleProduct.specifications) && singleProduct.specifications.length > 0 && (
          <div className='w-full sm:max-w-[500px]'>
            {singleProduct.specifications.map((item, index) => (
              <div key={index} className='grid grid-cols-2 border border-blue-200 text-blue-200 text-sm bg-blue-800/10'>
                <p className='border-r border-blue-200 p-2'>{item.key}</p>
                <p className='border-blue-200 p-2'>{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;
