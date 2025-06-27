import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { TiMessages } from "react-icons/ti";

const OurValues = () => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-4 xl:gap-12 gap-6 lg:px-20 px-4'>
      <div className='flex gap-6 items-center justify-center p-4 border border-from rounded-lg shadow-md shadow-amber-50'> 
        <p className='text-4xl text-to'>
            <TbTruckDelivery />
        </p>
        <div className='bg-gradient-to-r from-from to-to bg-clip-text text-transparent'>
            <p className='font-semibold'>Island-wide Delivery</p>
            <p className='text-sm font-light'>Fast & Safe</p>
        </div>
      </div>
      <div className='flex gap-6 items-center justify-center p-4 border border-from rounded-lg shadow-md shadow-amber-50'> 
        <p className='text-4xl text-to'>
            <AiOutlineProduct />
        </p>
        <div className='bg-gradient-to-r from-from to-to bg-clip-text text-transparent'>
            <p className='font-semibold'>Genuine Products</p>
            <p className='text-sm font-light'>With Warranty</p>
        </div>
      </div>
      <div className='flex gap-6 items-center justify-center p-4 border border-from rounded-lg shadow-md shadow-amber-50'> 
        <p className='text-4xl text-to'>
            <MdOutlinePayment />
        </p>
        <div className='bg-gradient-to-r from-from to-to bg-clip-text text-transparent'>
            <p className='font-semibold'>Secure Payment</p>
            <p className='text-sm font-light'>100% Secure Payment</p>
        </div>
      </div>
      <div className='flex  gap-6 items-center justify-center p-4 border border-from rounded-lg shadow-md shadow-amber-50'> 
        <p className='text-4xl text-to'>
            <TiMessages />
        </p>
        <div className='bg-gradient-to-r from-from to-to bg-clip-text text-transparent'>
            <p className='font-semibold'>24/7 Support</p>
            <p className='text-sm font-light'>Dedicated Support</p>
        </div>
      </div>
    </div>
  )
}

export default OurValues
