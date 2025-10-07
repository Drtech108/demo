// src/pages/Payment.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../hooks/useCart";
import { db } from "../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [method, setMethod] = useState("card");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const handleConfirm = async () => {
    if (!fullName || !email || !address) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const orderRef = await addDoc(collection(db, "orders"), {
        customer: { fullName, email, address },
        cart,
        total,
        method,
        createdAt: Timestamp.now(),
      });

      clearCart();

      navigate(`/order-confirmed?id=${orderRef.id}`, {
        state: {
          orderId: orderRef.id,
          customer: { fullName, email, address },
          total,
          method,
        },
      });
    } catch (err) {
      console.error("Error saving order:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16 min-h-screen relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-50">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* Company Logo with blur-to-clear effect */}
            <motion.img
              key={loading ? "loading-start" : "loading-end"} // reset animation on each load
              src="/logo.jpg"
              alt="Company Logo"
              className="w-12 h-12 rounded-full"
              initial={{ filter: "blur(8px)", opacity: 0.6 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Circular Loader */}
            <motion.svg
              className="absolute w-full h-full"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="#f97316"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset="283"
                animate={{ strokeDashoffset: [283, 0, 283] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.svg>
          </div>
          <p className="mt-6 text-white text-base font-medium">
            Processing payment...
          </p>
        </div>
      )}

      <div className="mx-auto max-w-5xl px-6 grid lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow p-8 lg:col-span-2"
        >
          <h1 className="text-2xl font-bold mb-6">Payment Details</h1>

          {/* Billing Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded-lg px-4 py-3 w-full md:col-span-2 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h2 className="font-semibold mb-3">Select Payment Method</h2>
            <div className="flex gap-4">
              {[
                { id: "card", label: "Credit / Debit Card" },
                { id: "paypal", label: "PayPal" },
                { id: "cash", label: "Cash on Delivery" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setMethod(opt.id)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    method === opt.id
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Card Details */}
          {method === "card" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Card Number"
                className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-orange-500 md:col-span-2"
              />
              <input
                type="text"
                placeholder="MM/YY"
                className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="CVC"
                className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {loading ? "Processing..." : "Confirm Payment"}
          </button>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow p-8"
        >
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-orange-600">${total.toFixed(2)}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
