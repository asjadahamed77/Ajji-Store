import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserOrders, updateOrderToShipped, updateOrderToDelivered } from '../redux/slices/orderSlice'
import dayjs from 'dayjs'

const Orders = () => {
  const dispatch = useDispatch()
  const {orders, loading, error} = useSelector((state) => state.order)

  useEffect(()=>{
    dispatch(getUserOrders())
  },[dispatch])

  const handleMarkAsShipped = async (orderId) => {
    try {
      await dispatch(updateOrderToShipped(orderId)).unwrap();
    } catch (error) {
      console.error("Failed to mark order as shipped:", error);
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    try {
      await dispatch(updateOrderToDelivered(orderId)).unwrap();
    } catch (error) {
      console.error("Failed to mark order as delivered:", error);
    }
  };

  if (loading) {
    return (
      <div className='h-screen  py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center'>
            <div className="animate-spin rounded-full h-12 w-12 mt-8 border-b-2 border-blue-400 mx-auto"></div>
            <p className="mt-4 text-blue-300">Loading orders...</p>
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
    <div className='h-screen overflow-y-scroll  py-8 px-4 sm:px-6 lg:px-8 pb-24'>
      <div className='max-w-7xl mx-auto'>
        <h1 className="w-fit text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent mb-8">All Orders</h1>
        
        {orders && orders.length > 0 ? (
          <div className='space-y-6'>
            {orders.map((order) => (
              <div key={order._id} className='bg-white/5 p-6 rounded-lg shadow-lg'>
                <div className='flex flex-col md:flex-row justify-between mb-4'>
                  <div>
                    <h2 className='text-xl font-semibold text-blue-200'>Order #{order._id.slice(-6)}</h2>
                    <p className='text-blue-300/70 text-sm'>
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
                
                <div className='border-t border-blue-300/20 my-4'></div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <h3 className='text-lg font-medium text-blue-200 mb-2'>Customer Information</h3>
                    {order.user ? (
                      <div className='text-sm text-blue-300/70'>
                        <p><span className='font-medium'>Name:</span> {order.user.name}</p>
                        <p><span className='font-medium'>Email:</span> {order.user.email}</p>
                        {order.user.phone && <p><span className='font-medium'>Phone:</span> {order.user.phone}</p>}
                      </div>
                    ) : (
                      <p className='text-sm text-blue-300/70'>User information not available</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className='text-lg font-medium text-blue-200 mb-2'>Shipping Address</h3>
                    <div className='text-sm text-blue-300/70'>
                      <p><span className='font-medium'>Address:</span> {order.shippingAddress.address}</p>
                      <p><span className='font-medium'>City:</span> {order.shippingAddress.city}</p>
                      <p><span className='font-medium'>Postal Code:</span> {order.shippingAddress.postalCode}</p>
                      <p><span className='font-medium'>Country:</span> {order.shippingAddress.country}</p>
                    </div>
                  </div>
                </div>
                
                <div className='border-t border-blue-300/20 my-4'></div>
                
                <h3 className='text-lg font-medium text-blue-200 mb-2'>Order Items</h3>
                <div className='space-y-4'>
                  {order.orderItems.map((item, index) => (
                    <div key={index} className='flex justify-between items-center'>
                      <div className='flex items-center space-x-4'>
                        <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded' />
                        <div>
                          <p className='font-medium text-blue-200'>{item.name}</p>
                          <p className='text-sm text-blue-300/70'>
                            {item.quantity} x Rs.{item.price}
                            {item.color && ` - ${item.color}`}
                            {item.storage && ` - ${item.storage} GB`} 
                          </p>
                        </div>
                      </div>
                      <p className='font-medium text-blue-200'>Rs.{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                
                <div className='border-t border-blue-300/20 my-4'></div>
                
                <div className='flex justify-between text-blue-200 font-semibold'>
                  <span>Total</span>
                  <span>Rs.{order.totalPrice}</span>
                </div>
                
                <div className='mt-4 flex space-x-2'>
                  {order.status === 'Processing' && (
                    <button 
                      onClick={() => handleMarkAsShipped(order._id)}
                      className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
                    >
                      Mark as Shipped
                    </button>
                  )}
                  {order.status === 'Shipped' && (
                    <button 
                      onClick={() => handleMarkAsDelivered(order._id)}
                      className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
                    >
                      Mark as Delivered
                    </button>
                  )}
                  {order.status === 'Delivered' && (
                    <span className='px-4 py-2 bg-green-500/20 text-green-400 rounded'>
                      Order Delivered
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-blue-300'>No orders found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
