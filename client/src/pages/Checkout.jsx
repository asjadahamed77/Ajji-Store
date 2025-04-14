import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import PayPalButton from '../components/PayPalButton';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { clearCart } from '../redux/slices/cartSlice';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    const [formData, setFormData] = useState({
        street: '',
        city: '',
        zipCode: '',
        country: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load user's saved address if available
    useEffect(() => {
        if (user?.address) {
            setFormData({
                street: user.address.addressLine || '',
                city: user.address.city || '',
                zipCode: user.address.postalCode || '',
                country: user.address.country || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePaymentSuccess = async (paypalOrder) => {
        if (!formData.street || !formData.city || !formData.zipCode || !formData.country) {
            toast.error("Please fill in all shipping information");
            return;
        }

        const cartItems = cart?.products || [];
        if (!cartItems.length) {
            toast.error("Your cart is empty");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Create order data
            const orderData = {
                shippingAddress: {
                    address: formData.street,
                    city: formData.city,
                    postalCode: formData.zipCode,
                    country: formData.country
                },
                paymentMethod: "PayPal",
                paymentResult: {
                    id: paypalOrder.id,
                    status: paypalOrder.status,
                    update_time: paypalOrder.update_time,
                    email_address: paypalOrder.payer?.email_address
                }
            };

            // Create order
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
                orderData,
               
                { withCredentials: true }
            );

            if (response.data) {
                // Clear cart
                dispatch(clearCart());
                
                // Show success message
                toast.success("Order placed successfully!");
                
             navigate('/my-orders')
            }
        } catch (err) {
            console.error("Order creation error:", err);
            setError(err.response?.data?.message || "Failed to place order. Please try again.");
            toast.error(err.response?.data?.message || "Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentError = (error) => {
        console.error("Payment error:", error);
        setError(error.message || "Payment failed. Please try again.");
        toast.error(error.message || "Payment failed. Please try again.");
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    const cartItems = cart?.products || [];
    if (!cartItems.length) {
        return (
            <div className='min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 py-8 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold text-blue-200 mb-4'>Your Cart is Empty</h1>
                        <p className='text-blue-300 mb-8'>Add some items to your cart before checking out.</p>
                        <button
                            onClick={() => navigate('/products')}
                            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 py-8 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-3xl font-bold text-blue-200 mb-8'>Checkout</h1>
                
                {error && (
                    <div className='mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400'>
                        {error}
                    </div>
                )}

                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Shipping Information */}
                    <div className='flex-1'>
                        <div className='bg-white/5 p-6 rounded-lg shadow-lg'>
                            <h2 className='text-xl font-semibold text-blue-200 mb-6'>Shipping Information</h2>
                            <div className='space-y-4'>
                                <div>
                                    <label className='block text-blue-300 mb-2'>Street Address</label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        className='w-full p-2 bg-white/10 border rounded text-blue-200 focus:outline-none focus:border-blue-400 border-blue-300/30'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-blue-300 mb-2'>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className='w-full p-2 bg-white/10 border rounded text-blue-200 focus:outline-none focus:border-blue-400 border-blue-300/30'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-blue-300 mb-2'>ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className='w-full p-2 bg-white/10 border rounded text-blue-200 focus:outline-none focus:border-blue-400 border-blue-300/30'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-blue-300 mb-2'>Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className='w-full p-2 bg-white/10 border rounded text-blue-200 focus:outline-none focus:border-blue-400 border-blue-300/30'
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary & Payment */}
                    <div className='lg:w-96'>
                        <div className='bg-white/5 p-6 rounded-lg shadow-lg sticky top-8'>
                            <h2 className='text-xl font-semibold text-blue-200 mb-6'>Order Summary</h2>
                            <div className='space-y-4 mb-6'>
                                {cartItems.map((item,index) => (
                                    <div key={index} className='flex justify-between items-center'>
                                        <div>
                                            <p className='font-medium text-blue-200'>{item.name}</p>
                                            <p className='text-sm text-blue-300/70'>
                                                {item.quantity} x ${item.price}
                                                {item.color && ` - ${item.color}`}
                                                {item.storage && ` - ${item.storage}`}
                                            </p>
                                        </div>
                                        <p className='font-medium text-blue-200'>${item.price * item.quantity}</p>
                                    </div>
                                ))}
                                <div className='border-t border-blue-300/20 my-4'></div>
                                <div className='flex justify-between text-blue-200 font-semibold text-lg'>
                                    <span>Total</span>
                                    <span>${cart.totalPrice}</span>
                                </div>
                            </div>
                            <div className='space-y-4'>
                                <h3 className='text-lg font-medium text-blue-200'>Payment Method</h3>
                                <div className='bg-white/10 p-4 rounded'>
                                    {loading ? (
                                        <div className="text-center py-4">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                                            <p className="mt-2 text-blue-300">Processing payment...</p>
                                        </div>
                                    ) : (
                                        <PayPalButton
                                            amount={cart.totalPrice}
                                            onSuccess={handlePaymentSuccess}
                                            onError={handlePaymentError}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
