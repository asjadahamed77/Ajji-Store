import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import PayPalButton from '../components/PayPalButton';

const Checkout = () => {
    const {user} = useSelector((state)=> state.auth)
    const {cart} = useSelector((state)=> state.cart)

    const handlePaymentSuccess = ()=>{
        alert("Payment Successful")
    }

  return (
    <div className='px-4 md:px-6 lg:px-10 py-8 flex flex-col lg:flex-row  gap-8'>
        {/* User Details */}
      <div className='w-full '>
    <h1 className="w-fit text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">Delivery Information</h1>
    <div className='flex flex-col'>
    <label className='font-medium text-blue-200 mt-4'>Name</label>
    <input type="text" className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={user.name} />
    <label className='font-medium text-blue-200 mt-4'>Email</label>
    <input type="email" className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={user.email} />
    <label className='font-medium text-blue-200 mt-4'>Phone</label>
    <input type="text" className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={user.phone} />
    <label className='font-medium text-blue-200 mt-4'>Delivery Address</label>
    <input type="text" className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={user.address.addressLine} />
    <div className='grid lg:grid-cols-2 gap-4 mt-4'>
        <div>
        <label className='font-medium text-blue-200 '>City</label>
        <input type="text" className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={user.address.city} />
        </div>
        <div>
        <label className='font-medium text-blue-200 '>Postal Code</label>
        <input type="text" className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={user.address.postalCode} />
        </div>
    </div>
    <label className='font-medium text-blue-200 mt-4'>Country</label>
    <input type="text" className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={user.address.country} />
    </div>
      </div>
      {/* Payment */}
      <div className='bg-white/5 p-4 rounded-lg shadow-lg h-fit flex flex-col gap-4 w-full lg:w-[600px]'> 
        <h1 className="w-fit text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">Payment</h1>
        <p className='text-xl font-medium'>Amount</p>
        <p className='text-2xl text-neutral-50 font-semibold mt-[-8px]'>Rs.{cart.totalPrice}</p>
        <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                
                  <PayPalButton
                    amount={cart.totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onError={(err) => alert("Payment Failed. Try again.")}
                  />
            
              
              </div>
      </div>
    </div>
  )
}

export default Checkout
