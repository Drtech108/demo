// src/pages/Contact.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  FieldValue,
} from "firebase/firestore";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

type FruitPos = { left: number; top: number; size: number; img: string };
type FAQ = { q: string; a: string };

interface Message {
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: FieldValue;
}

export default function Contact(): React.ReactElement {
  const [fruitPositions, setFruitPositions] = useState<FruitPos[]>([]);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fruits = [
    "https://cdn-icons-png.flaticon.com/512/415/415733.png",
    "https://cdn-icons-png.flaticon.com/512/135/135620.png",
    "https://cdn-icons-png.flaticon.com/512/4064/4064890.png",
    "https://cdn-icons-png.flaticon.com/512/1046/1046869.png",
    "https://cdn-icons-png.flaticon.com/512/415/415734.png",
  ];

  useEffect(() => {
    const positions: FruitPos[] = Array.from({ length: 14 }).map((_, i) => ({
      left: 4 + Math.round(Math.random() * 92),
      top: 4 + Math.round(Math.random() * 86),
      size: 34 + Math.round(Math.random() * 56),
      img: fruits[i % fruits.length],
    }));
    setFruitPositions(positions);
  },[]);

  const faqs: FAQ[] = [
    { q: "Do you take reservations?", a: "Yes — we recommend booking ahead, especially on weekends." },
    { q: "Do you accommodate dietary restrictions?", a: "Absolutely. Let us know and we’ll work with you." },
    { q: "Do you offer catering services?", a: "Yes — contact our events team for menus and pricing." },
    { q: "Is there parking available?", a: "Yes. Street and nearby lot parking are available." },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  } as const;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const messageData: Message = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "messages"), messageData);
      alert("✅ Message sent successfully!");
      e.currentTarget.reset();
    }  finally {
      setLoading(false);
    }
  };

  // Google Maps setup
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const center = { lat: 37.7749, lng: -122.4194 };

  return (
    <section className="relative bg-gray-50 py-20 overflow-hidden">
      {/* Fruits background */}
      <div className="absolute inset-0 pointer-events-none">
        {fruitPositions.map((f, idx) => (
          <img
            key={idx}
            src={f.img}
            alt=""
            aria-hidden
            className="absolute opacity-10 select-none"
            style={{ left: `${f.left}%`, top: `${f.top}%`, width: f.size, height: f.size }}
          />
        ))}
      </div>

      {/* Hero */}
      <div className="relative z-10 text-center mb-16 px-6">
        <motion.h1 initial="hidden" animate="show" variants={fadeUp} className="text-4xl md:text-5xl font-extrabold">
          Contact Us
        </motion.h1>
        <motion.p initial="hidden" animate="show" variants={fadeUp} className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We’d love to hear from you — whether you have a question, feedback, or want to book a table.
        </motion.p>
      </div>

      {/* Form + Map */}
      <div className="relative z-10 max-w-6xl mx-auto grid gap-12 px-6 md:grid-cols-2">
        {/* Form */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" type="text" placeholder="Your name" required className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-400" />
            <input name="email" type="email" placeholder="you@domain.com" required className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-400" />
            <input name="subject" type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-400" />
            <textarea name="message" rows={5} placeholder="Your message" required className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-400" />
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Map */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Our Location</h2>
          <p className="text-gray-600">Aflao,Ghana — +233 (0)553 879969</p>
          <p className="text-gray-600 mt-2">Open Daily: 10 AM – 10 PM</p>
          <div className="mt-4 w-full h-64 rounded-lg overflow-hidden border">
            {isLoaded ? (
              <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={center} zoom={14}>
                <Marker position={center} />
              </GoogleMap>
            ) : (
              <p>Loading map...</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* FAQ */}
      <div className="relative z-10 max-w-4xl mx-auto mt-16 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-lg p-4 bg-white shadow-sm">
              <button
                type="button"
                className="w-full text-left font-semibold flex justify-between items-center"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                {faq.q}
                <span>{openFAQ === i ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {openFAQ === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-gray-600 overflow-hidden"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
