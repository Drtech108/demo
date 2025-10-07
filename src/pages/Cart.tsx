// src/pages/Cart.tsx
import { motion } from "framer-motion";
import { useCart } from "../hooks/useCart";
import type { CartItem } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // ✅ import navigation

export default function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const navigate = useNavigate(); // ✅ hook for navigation

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-3xl font-extrabold mb-8">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item: CartItem) => (
              <motion.div
                key={item.id}
                className="flex items-center gap-4 bg-white rounded-xl shadow p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </motion.div>
            ))}

            {/* Cart Summary */}
            <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
              <p className="text-lg font-semibold">
                Total:{" "}
                <span className="text-orange-600">${total.toFixed(2)}</span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => navigate("/payment")} // ✅ go to checkout page
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
