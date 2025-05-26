import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  Link } from 'react-router-dom';
import {  fetchAccessories } from '../redux/slices/productSlice';

const HomeAccessories = () => {
    const dispatch = useDispatch()
    const {accessories, loading, error} = useSelector(state => state.products);

    useEffect(()=>{
        dispatch(fetchAccessories())
    },[dispatch])
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
    
   
    
    

  return accessories && (
    <div className=''>
      {/* Title Text */}
      <div>
        <h1 className="w-fit text-2xl  md:text-4xl font-bold bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">Gear Up with the Latest Accessories</h1>
      </div>
      {/* Show Products */}
      <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-5 px-2 md:px-6 lg:px-10 py-8 gap-2 space-y-2 sm:gap-4">
      {accessories.map((item, index) => (
        <Link 
        to={`/product/${item._id}`}
          key={index}
          className="sm:p-4 p-2 border border-blue-200 rounded-lg flex flex-col items-center cursor-pointer duration-300 transform hover:-translate-y-2 shadow-amber-50 shadow-md"
        >
          <div className="flex justify-center">
            <img
              src={item.images[0].url}
              alt="Phone"
                 className="w-60 h-60 object-contain bg-white"
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

export default HomeAccessories





