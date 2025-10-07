// src/pages/Checkout.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill in all fields.");
      return;
    }
    navigate("/payment", { state: { customer: form, total } });
  };

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-extrabold mb-8">Checkout</h1>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <p key={item.id}>
              {item.title} × {item.quantity} — {item.price}
            </p>
          ))}
          <p className="mt-4 font-semibold">
            Total: <span className="text-orange-600">${total.toFixed(2)}</span>
          </p>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-3"
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-3"
          />
          <button
            onClick={handleNext}
            className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </section>
  );
}
