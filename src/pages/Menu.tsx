import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { useCart } from "../hooks/useCart";
 // ✅ use the global cart

type MenuItem = {
  id: number;
  title: string;
  desc: string;
  img: string;
  price: string;
};

export default function Menu() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  

  // ✅ use global cart
  const {  addToCart } = useCart();

  const menu = {
    starters: [
      { id: 1, title: "Crispy Calamari", desc: "Tender calamari, lightly breaded and fried to a golden crisp. Served with a side of zesty marinara sauce.", img: "/Crispy-Calamari.jpg", price: "$12.00" },
      { id: 2, title: "Spinach & Artichoke Dip", desc: "Creamy blend of spinach, artichoke hearts, and cheeses, served hot with tortilla chips.", img: "/Spinach & Artichoke Dip.jpg", price: "$10.00" },
      { id: 3, title: "Bruschetta Trio", desc: "Toasted baguette slices topped with fresh tomato basil, roasted red pepper hummus, and balsamic glaze.", img: "/Bruschetta Trio.jpg", price: "$9.00" },
    ],
    mains: [
      { id: 4, title: "Grilled Salmon", desc: "Fresh Atlantic salmon fillet, grilled to perfection and served with roasted vegetables and lemon butter sauce.", img: "/Grilled Salmon.jpg", price: "$24.00" },
      { id: 5, title: "Chicken Parmesan", desc: "Breaded chicken breast topped with marinara sauce and melted mozzarella cheese, served with spaghetti.", img: "/Chicken Parmesan.jpg", price: "$20.00" },
      { id: 6, title: "Vegetable Stir-Fry", desc: "Assorted fresh vegetables stir-fried with your choice of protein in a savory sauce, served over steamed rice.", img: "Vegetable Stir-Fry.jpg", price: "$16.00" },
    ],
    desserts: [
      { id: 7, title: "Chocolate Lava Cake", desc: "Warm chocolate cake with a molten chocolate center, served with vanilla bean ice cream.", img: "/Chocolate Lava Cake.jpg", price: "$9.00" },
      { id: 8, title: "Cheesecake", desc: "Classic creamy cheesecake with a graham cracker crust, topped with your choice of fruit compote.", img: "/Cheesecake.jpg", price: "$8.00" },
      { id: 9, title: "Apple Crisp", desc: "Warm apple crisp with a cinnamon oat topping, served with a scoop of vanilla ice cream.", img: "/Apple Crisp.jpg", price: "$8.00" },
    ],
    drinks: [
      { id: 10, title: "Iced Tea", desc: "Freshly brewed iced tea, served with lemon.", img: "/Iced Tea.jpg", price: "$3.00" },
      { id: 11, title: "Lemonade", desc: "Refreshing homemade lemonade.", img: "/Lemonade.jpg", price: "$4.00" },
      { id: 12, title: "Soft Drinks", desc: "Assorted soft drinks.", img: "/Soft Drinks.jpg", price: "$3.00" },
    ],
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Floating Fruit Icons
  const fruits = [
    "https://cdn-icons-png.flaticon.com/512/415/415733.png",
    "https://cdn-icons-png.flaticon.com/512/135/135620.png",
    "https://cdn-icons-png.flaticon.com/512/4064/4064890.png",
    "https://cdn-icons-png.flaticon.com/512/1046/1046869.png",
    "https://cdn-icons-png.flaticon.com/512/415/415734.png",
  ];

  // Add to cart using global context
  const handleAddToCart = (item: MenuItem) => {
    addToCart(item); // ✅ now using context
    setSelectedItem(null);
  };

  

  return (
    <section className="relative bg-gray-50 py-16 overflow-hidden">
      {/* Floating Fruits */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => {
          const left = Math.random() * 100;
          const size = 30 + Math.random() * 50;
          const duration = 12 + Math.random() * 10;
          const delay = Math.random() * 5;
          return (
            <motion.img
              key={i}
              src={fruits[i % fruits.length]}
              alt="fruit"
              className="absolute opacity-5"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: "-80px",
              }}
              animate={{ y: ["0%", "-380vh"], rotate: [0, 360] }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay,
              }}
            />
          );
        })}
      </div>

     

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-center mb-16 relative"
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[450px] h-[220px] bg-orange-100 rounded-full blur-3xl opacity-60 -z-10"></div>
          <h1 className="text-4xl font-extrabold mb-4">Discover Our Menu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From light starters to hearty mains and decadent desserts, every
            dish is crafted with love and the freshest ingredients.
          </p>
        </motion.div>

        {/* Menu Sections */}
        {Object.entries(menu).map(([section, items], sectionIndex) => {
          const colors = ["bg-rose-200", "bg-green-200", "bg-yellow-200", "bg-purple-200"];
          const color = colors[sectionIndex % colors.length];

          return (
            <div key={section} className="mb-16 relative">
              <div
                className={`absolute -top-6 left-0 w-[320px] h-[130px] ${color} rounded-full blur-2xl opacity-50 -z-10`}
              ></div>
              <h2 className="text-2xl font-bold mb-8 capitalize">{section}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <motion.img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                      <p className="text-orange-600 font-semibold mt-3">{item.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Popup Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
              initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.img}
                alt={selectedItem.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                <p className="text-gray-600 mb-4">{selectedItem.desc}</p>
                <p className="text-orange-600 font-semibold">{selectedItem.price}</p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleAddToCart(selectedItem)}
                    className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </section>
  );
}
