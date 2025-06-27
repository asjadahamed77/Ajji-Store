import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast';

const PayPalButton = ({ amount, onSuccess, onError }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleError = (err) => {
        console.error("PayPal error:", err);
        setError(err);
        onError?.(err);
        toast.error("Payment failed. Please try again.");
    };

    return (
        <PayPalScriptProvider options={{
            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
            currency: "USD"
        }}>
            <div className="w-full">
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
                        {error.message || "Payment failed. Please try again."}
                    </div>
                )}
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                        setLoading(true);
                        setError(null);
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: (amount / 280).toFixed(2), // Convert PKR to USD (approximate rate)
                                        currency_code: "USD"
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        try {
                            const order = await actions.order.capture();
                            setLoading(false);
                            onSuccess(order);
                        } catch (err) {
                            handleError(err);
                            setLoading(false);
                        }
                    }}
                    onError={(err) => {
                        handleError(err);
                        setLoading(false);
                    }}
                    onCancel={() => {
                        setLoading(false);
                        toast.error("Payment cancelled");
                    }}
                />
                {loading && (
                    <div className="mt-4 text-center text-price">
                        Processing payment...
                    </div>
                )}
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
