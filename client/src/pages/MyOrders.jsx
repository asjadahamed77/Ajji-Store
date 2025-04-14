import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../redux/slices/orderSlice'

const MyOrders = () => {
  const {orders} = useSelector((state) => state.order)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUserOrders())
  },[dispatch,orders])

  return (
    <div className='px-4 md:px-6 lg:px-10 py-8 '>
              <h1 className="w-fit text-2xl  md:text-4xl font-bold bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">My Orders</h1>
              <div className='grid lg:grid-cols-2 gap-4 mt-6'>
               {
                 orders.map((item,index)=>(
                  <div key={index} className='bg-white/5  border border-blue-50 text-blue-200 rounded shadow-lg p-4 '>
                    <h2 className='text-lg font-semibold'>Order ID: {item._id}</h2>
                  <div className='space-y-2 text-sm'>
                  {
                    item.orderItems.map((item,index)=>(
                      <div key={index} className='p-2 bg-white/10 my-2'>
                        <p>Product: <span className='font-medium'>{item.name}</span></p>
                        <p>{
                          item.brand && <p>Brand: <span className='font-medium'>{item.brand}</span></p>
                          }</p>
                          <p>{
                          item.color && <p>Color: <span className='font-medium'>{item.color}</span></p>
                          }</p>
                        <p>Price: <span className='font-medium'>Rs.{item.price}</span></p>
                        <p>{
                          item.storage && <p>Storage: <span className='font-medium'>{item.storage} GB</span></p>
                          }</p>
                           <p>Qty: <span className='font-medium'>{item.quantity}</span></p>
                      </div>
                    ))
                  }
                  </div>

                    <p className='text-sm'>Total Price: <span className='font-semibold text-base'>Rs. {item.totalPrice}</span></p>
                    <p className='text-sm'>Status: {item.isPaid ? 'Paid' : 'Pending'}</p>
                    <p className='text-sm'>Date: {new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                ))
               }
              </div>
    </div>
  )
}

export default MyOrders
