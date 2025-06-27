import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../redux/slices/cartSlice";
import { MdDeleteSweep } from "react-icons/md";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"
import Title from "../components/Title";


const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  
  }, [dispatch]);

  if (loading) {
    return (
      <div className='min-h-screen  py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center'>
            <div className="animate-spin rounded-full h-12 w-12 mt-8 border-b-2 border-blue-400 mx-auto"></div>
            <p className="mt-4 bg-gradient-to-r from-from to-to bg-clip-text text-transparent">Loading cart...</p>
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
  if (!cart || cart.products.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="bg-gradient-to-r from-from to-to bg-clip-text text-transparent text-xl">Your cart is empty</p>
      </div>
    );

  const handleQuantityChange = async (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    try {
      await dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
        })
      ).unwrap();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeFromCart(productId)).unwrap();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
       <div className="mb-4">
       <Title title="Shopping Cart"  />
       </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1  space-y-4">
            {cart.products.map((product, index) => (
              <div
                key={index}
                className="grid md:grid-cols-[1fr_4fr_2fr] items-center bg-white/5 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="md:w-32 md:h-32 w-20 h-20 object-cover rounded-lg"
                  />
                </div>

                {/* Details */}
                <div className="md:ml-4 mt-4 md:mt-0  ">
                  <h2 className="text-sm md:text-xl font-semibold bg-gradient-to-r from-from to-to bg-clip-text text-transparent mb-2">
                    {product.name}
                  </h2>
                  <div className="space-y-1 mb-4">
                    <p className="text-sm bg-gradient-to-r from-from to-to bg-clip-text text-transparent">
                      Price:{" "}
                      <span className="font-semibold">Rs.{product.price}</span>
                    </p>
                    {product.color && (
                      <p className="text-sm bg-gradient-to-r from-from to-to bg-clip-text text-transparent">
                        Color:{" "}
                        <span className="font-semibold">{product.color}</span>
                      </p>
                    )}
                    {product.storage && (
                      <p className="text-sm bg-gradient-to-r from-from to-to bg-clip-text text-transparent">
                        Storage:{" "}
                        <span className="font-semibold">{product.storage} GB</span>
                      </p>
                    )}
                  </div>
                </div>
                {/* Update and Delete */}
                <div>
                  <button
                    className="w-fit px-4 py-2 rounded border font-semibold cursor-pointer hover:bg-white hover:text-blue-950 duration-300 transition-all"
                    onClick={() =>
                      handleQuantityChange(
                        product.productId,
                        product.quantity,
                        -1
                      )
                    }
                  >
                    -
                  </button>
                  <span className="w-8 text-center mx-4 bg-gradient-to-r from-from to-to bg-clip-text text-transparent font-semibold">
                    {product.quantity}
                  </span>
                  <button
                    className="w-fit px-4 py-2 rounded border  font-semibold cursor-pointer hover:bg-white hover:text-blue-950 duration-300 transition-all"
                    onClick={() =>
                      handleQuantityChange(
                        product.productId,
                        product.quantity,
                        1
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    className="ml-4 p-2 text-red-400 hover:text-red-300 transition-colors"
                    onClick={() => handleRemoveItem(product.productId)}
                  >
                    <MdDeleteSweep className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white/10 p-6 rounded-lg shadow-lg sticky top-8">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-from to-to bg-clip-text text-transparent mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between bg-gradient-to-r from-from to-to bg-clip-text text-transparent">
                  <span>Subtotal</span>
                  <span>Rs.{cart.totalPrice}</span>
                </div>
                <div className="flex justify-between bg-gradient-to-r from-from to-to bg-clip-text text-transparent">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="border-t border-blue-300/20 my-4"></div>
                <div className="flex justify-between text-price font-semibold text-lg">
                  <span>Total</span>
                  <span>Rs.{cart.totalPrice}</span>
                </div>
              </div>
              <button onClick={()=> navigate('/checkout')} className="w-full px-12 py-2 rounded border mt-4 font-semibold cursor-pointer hover:bg-white hover:text-blue-950 duration-300 transition-all">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
