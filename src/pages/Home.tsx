
// src/pages/Home.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
    const [selected, setSelected] = useState<null | { img: string; title: string }>(null);

  const favorites = [
    { id: 1, title: "Crispy Calamari", img: "/Crispy-Calamari.jpg", desc: "Tender calamari with zesty sauce." },
    { id: 2, title: "Stuffed Mushrooms", img: "/Stuffed Mushrooms.jpg", desc: "Savory mushrooms filled with herbs and cheese." },
    { id: 3, title: "Spinach Dip", img: "/Spinach Dip.jpg", desc: "Creamy spinach artichoke dip with chips." },
    { id: 4, title: "BBQ Ribs", img: "/BBQ Ribs.jpg", desc: "Juicy ribs glazed with BBQ sauce." },
    { id: 5, title: "Cheesecake", img: "/Cheesecake.jpg", desc: "Classic cheesecake with strawberry topping." },
    { id: 6, title: "Grilled Salmon", img: "/Grilled Salmon.jpg", desc: "Perfectly grilled salmon with herbs." },
    { id: 7, title: "Truffle Pasta", img: "/Truffle Pasta.jpg", desc: "Creamy truffle pasta—rich & aromatic." },
    { id: 8, title: "Avocado Salad", img: "/Avocado Salad.jpg", desc: "Fresh greens with smashed avocado." },
  ];

  return (
    <div className="m-0 p-0">
      {/* HERO (explicit initial/animate with delays to avoid variant objects) */}
     <section className="grid min-h-[90vh] place-items-center bg-gray-600 bg-[url('imgs/background.jpg')] bg-cover bg-center bg-blend-overlay text-center px-6">
      <div className=" max-w-3xl">
        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg text-white"
        >
          Welcome to Tasty Bites
        </motion.h1>

        {/* Subtext with Typewriter */}
        <motion.p
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-medium text-white"
        >
        <span
            className="
            animate-typing border-orange-400 pr-2 block md:inline-block md:whitespace-nowrap
            [--typing-speed:8s] sm:[--typing-speed:7s] md:[--typing-speed:6s] lg:[--typing-speed:5s]
            "
        >
            Experience the finest dining — handcrafted plates, warm ambience,
            and flavors that keep you coming back.
        </span>
        </motion.p>


        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <motion.a
            href="/menu"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.26, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.06 }}
            className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-3 font-semibold text-white shadow-xl"
          >
            View Menu
          </motion.a>

          <motion.a
            href="/contact"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.32, type: "spring", stiffness: 240, damping: 22 }}
            whileHover={{ scale: 1.03 }}
            className="rounded-full bg-white/90 px-6 py-3 font-semibold text-gray-900 shadow"
          >
            Book a Table
          </motion.a>
        </div>
      </div>
    </section>

      {/* ABOUT */}
      <section className="relative mx-auto max-w-5xl px-6 py-24 text-center overflow-hidden">
  {/* Floating background circles spread across the section */}
  <motion.div
    animate={{ y: [0, -40, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className="absolute top-10 left-5 w-40 h-40 rounded-full bg-orange-200 opacity-30"
  />
  <motion.div
    animate={{ y: [0, 50, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-rose-200 opacity-25"
  />
  <motion.div
    animate={{ x: [0, 30, 0] }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    className="absolute bottom-20 left-1/4 w-56 h-56 rounded-full bg-teal-200 opacity-20"
  />
  <motion.div
    animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-200 opacity-20"
  />
  <motion.div
    animate={{ y: [0, 30, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-blue-200 opacity-25"
  />
  <motion.div
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
    className="absolute top-0 right-1/2 w-48 h-48 rounded-full bg-green-200 opacity-20"
  />

  {/* Main content */}
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.6 }}
    className="relative z-10 max-w-2xl mx-auto"
  >
    <h2 className="mb-6 text-3xl font-bold">About Us</h2>
    <p className="text-gray-700">
      At Tasty Bites we pair seasonal ingredients with bold technique. Every
      plate is composed with care to deliver memorable flavors and moments.
    </p>
  </motion.div>
</section>

      {/* CUSTOMER FAVORITES */}
      <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="mb-10 text-3xl font-bold">Customer Favorites</h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.map((fav, i) => (
            <motion.article
              key={fav.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="rounded-2xl bg-white shadow-lg overflow-hidden flex flex-col"
            >
              {/* Image wrapper */}
              <div
                className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() => setSelected(fav)}
              >
                <motion.img
                  src={fav.img}
                  alt={fav.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  initial={{ scale: 1.05 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow text-left">
                <h3 className="text-lg font-semibold">{fav.title}</h3>
                <p className="text-sm text-gray-600 mt-2 flex-grow">{fav.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)} // close when clicking background
          >
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative max-w-3xl w-full"
            >
              <img
                src={selected.img}
                alt={selected.title}
                className="w-full rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 bg-white/80 text-gray-900 rounded-full px-3 py-1 text-sm font-medium shadow hover:bg-white"
              >
                ✕ Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>

      {/* SPECIAL OFFER */}
<section className="mx-auto max-w-6xl px-6 py-16">
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
    className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 rounded-2xl bg-white shadow-xl overflow-hidden"
  >
    {/* LEFT - IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="overflow-hidden"
    >
      <motion.img
        src="/Crispy-Calamari.jpg"
        alt="Special offer dish"
        className="h-full w-full object-cover"
        initial={{ scale: 1 }}
        whileHover={{
          scale: [1, 1.08, 1],  // 🔥 zoom in & out
          rotate: [0, 3, -3, 0], // 🔥 rotate left & right
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        loading="lazy"
      />
    </motion.div>

    {/* RIGHT - TEXT */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="p-8 text-center lg:text-left"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mb-4 text-3xl font-bold text-gray-900"
      >
        Special Weekend Offer
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mb-6 text-gray-600"
      >
        Get 20% off all main dishes every Friday to Sunday — limited time only.
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.08, backgroundColor: "#f97316" }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-8 py-3 text-white font-semibold shadow-lg"
      >
        Reserve a Table
      </motion.button>
    </motion.div>
  </motion.div>
</section>


      {/* CONTACT TEASER */}
      <section className="bg-gray-900 px-6 py-16 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold">Visit Us</h2>
          <p className="mb-6 text-gray-300">Aflao,Ghana — +233 (0)553 879969</p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg"
          >
            Get Directions
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
