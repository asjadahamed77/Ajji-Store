import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { fetchAppleProducts } from '../redux/slices/productSlice';

const HomeApple = () => {
    const dispatch = useDispatch()
    const {appleProducts} = useSelector(state => state.products);

    useEffect(()=>{
        dispatch(fetchAppleProducts())
    },[dispatch])

   
    
    

  return appleProducts && (
    <div className=''>
      {/* Title Text */}
      <div>
        <h1 className="w-fit text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-200 to-blue-300 bg-clip-text text-transparent">The Best of Apple, All in One Place</h1>
      </div>
      {/* Show Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 px-2 md:px-6 lg:px-10 py-8 gap-2 sm:gap-4">
      {appleProducts.map((item, index) => (
        <Link 
        to={`/product/${item._id}`}
          key={index}
          className="sm:p-4 p-2 border border-blue-200 rounded-lg flex flex-col items-center cursor-pointer duration-300 transform hover:-translate-y-2 shadow-amber-50 shadow-md"
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
    </div>
  )
}

export default HomeApple
