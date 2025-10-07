// src/pages/OrderConfirmed.tsx
import { useLocation, Link } from "react-router-dom";

export default function OrderConfirmed() {
  const location = useLocation();
  const { customer, total, method } = location.state || {};

  return (
    <section className="bg-gray-50 py-16 min-h-screen text-center">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">
          ✅ Order Placed!
        </h1>
        <p className="mb-6">
          Thank you, {customer?.fullName}. Your order is on the way.
        </p>
        <p className="mb-4">
          Total Paid: ${total?.toFixed(2)} via {method}
        </p>
        <p className="mb-8">Delivery Address: {customer?.address}</p>
        <Link
          to="/menu"
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Back to Menu
        </Link>
      </div>
    </section>
  );
}
