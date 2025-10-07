// File: src/pages/AdminOrders.tsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

type Order = {
  id: string;
  customer: { fullName: string; email: string; address: string };
  cart: { id: string; title: string; price: string; quantity: number }[];
  total: number;
  method: string;
  createdAt: { seconds: number };
  delivered?: boolean;
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(data);
    });
    return unsubscribe;
  }, []);

  const toggleDelivered = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, "orders", id), { delivered: !current });
      toast.success(`Order marked as ${!current ? "delivered" : "pending"}`);
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="mx-auto max-w-6xl px-6">
        <Toaster position="top-right" />
        <h1 className="text-3xl font-bold mb-8">📋 Orders Dashboard</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-xl shadow ${
                  order.delivered ? "bg-green-50" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">
                    Order #{order.id.slice(-6).toUpperCase()}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt.seconds * 1000).toLocaleString()}
                  </span>
                </div>

                <p className="text-gray-700">
                  👤 <strong>{order.customer.fullName}</strong> <br />
                  ✉️ {order.customer.email} <br />
                  📍 {order.customer.address}
                </p>

                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold mb-2">Items:</h3>
                  <ul className="space-y-1 text-sm">
                    {order.cart.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span>
                          {item.title} × {item.quantity}
                        </span>
                        <span>{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between mt-4 font-semibold">
                  <span>💳 Method:</span>
                  <span className="capitalize">{order.method}</span>
                </div>
                <div className="flex justify-between mt-1 font-semibold text-lg">
                  <span>💰 Total:</span>
                  <span className="text-orange-600">
                    ${order.total.toFixed(2)}
                  </span>
                </div>

                {/* Delivered toggle button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => toggleDelivered(order.id, !!order.delivered)}
                    className={`px-4 py-2 rounded-lg shadow transition ${
                      order.delivered
                        ? "bg-gray-500 text-white hover:bg-gray-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {order.delivered ? "Mark as Pending" : "Mark as Delivered"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
