import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  Link } from 'react-router-dom';
import {  fetchSamsungProducts } from '../redux/slices/productSlice';
import Title from './Title';

const HomeSamsung = () => {
    const dispatch = useDispatch()
    const {samsungProducts, loading, error} = useSelector(state => state.products);

    useEffect(()=>{
        dispatch(fetchSamsungProducts())
    },[dispatch])
    if (loading) {
      return (
        <div className='min-h-screen  py-8 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-7xl mx-auto'>
            <div className='text-center'>
              <div className="animate-spin rounded-full h-12 w-12 mt-8 border-b-2 border-price mx-auto"></div>
              <p className="mt-4 bg-gradient-to-r from-from to-to bg-clip-text text-transparent">Loading...</p>
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
    
   
    
    

  return samsungProducts && (
    <div className=''>
      {/* Title Text */}
      <div>
       <Title title="Power Up with Samsung Tech" />
      </div>
      {/* Show Products */}
      <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-5 px-2 md:px-6 space-y-2 lg:px-10 py-8 gap-2 sm:gap-4">
      {samsungProducts.map((item, index) => (
        <Link 
        to={`/product/${item._id}`}
        onClick={() => window.scrollTo(0, 0)}
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
          <p className="bg-gradient-to-r from-from to-to bg-clip-text text-transparent font-semibold mt-4 capitalize">{item.name}</p>
         {
            (!Array.isArray(item.variants) || item.variants.length === 0) && <p className="bg-gradient-to-r from-from to-to bg-clip-text text-transparent font-normal text-sm">Starting at <span className="font-semibold text-base text-price" >Rs.{item.price}</span></p>
         }
         {
            Array.isArray(item.variants) && item.variants.length > 0 && <p className="bg-gradient-to-r from-from to-to bg-clip-text text-transparent font-normal text-sm">Starting at <span className="font-semibold text-base text-price" >Rs.{item.variants[0].price}</span></p>

         }
        </Link>
      ))}
    </div>
    </div>
  )
}

export default HomeSamsung
