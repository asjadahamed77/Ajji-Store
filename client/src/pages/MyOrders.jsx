import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../redux/slices/orderSlice'
import dayjs from 'dayjs'

const MyOrders = () => {
  const {orders, loading, error} = useSelector((state) => state.order)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUserOrders())
  },[dispatch])

  if (loading) {
    return (
      <div className='min-h-screen  py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center'>
            <div className="animate-spin rounded-full h-12 w-12 mt-8 border-b-2 border-price mx-auto"></div>
            <p className="mt-4 bg-gradient-to-r from-from to-to bg-clip-text text-transparent">Loading your orders...</p>
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
    <div className='min-h-screen  py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className="w-fit text-2xl md:text-4xl font-bold bg-gradient-to-r from-from to-to bg-clip-text text-transparent mb-8">My Orders</h1>
        
        {orders && orders.length > 0 ? (
          <div className='space-y-6'>
            {orders.map((order) => (
              <div key={order._id} className='bg-white/5 p-6 rounded-lg shadow-lg'>
                <div className='flex flex-col md:flex-row justify-between mb-4'>
                  <div>
                    <h2 className='text-xl font-semibold bg-gradient-to-r from-from to-to bg-clip-text text-transparent'>Order #{order._id.slice(-6)}</h2>
                    <p className='text-price/70 text-sm'>
                      Placed on {dayjs(order.createdAt).format('MMMM D, YYYY hh:mm A')}
                    </p>
                  </div>
                  <div className='mt-2 md:mt-0'>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'Shipped' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className='border-t border-price/20 my-4'></div>
                
                <div className='space-y-4'>
                  {order.orderItems.map((item, index) => (
                    <div key={index} className='flex justify-between items-center'>
                      <div className='flex items-center space-x-4'>
                        <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded' />
                        <div>
                          <p className='font-medium bg-gradient-to-r from-from to-to bg-clip-text text-transparent'>{item.name}</p>
                          <p className='text-sm text-price/70'>
                            {item.quantity} x Rs.{item.price}
                            {item.color && ` - ${item.color}`}
                            {item.storage && ` - ${item.storage}`}
                          </p>
                        </div>
                      </div>
                      <p className='font-medium bg-gradient-to-r from-from to-to bg-clip-text text-transparent'>Rs.{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                
                <div className='border-t border-price/20 my-4'></div>
                
                <div className='flex justify-between bg-gradient-to-r from-from to-to bg-clip-text text-transparent font-semibold'>
                  <span>Total</span>
                  <span>Rs.{order.totalPrice}</span>
                </div>
                
                <div className='mt-4 text-sm text-price/70'>
                  <p>Shipping Address:</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
                
                {order.user && (
                  <div className='mt-4 text-sm text-price/70'>
                    <p>Ordered by: {order.user.name}</p>
                    <p>Email: {order.user.email}</p>
                    {order.user.phone && <p>Phone: {order.user.phone}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='bg-gradient-to-r from-from to-to bg-clip-text text-transparent'>You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
