// src/pages/About.tsx
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function About() {
  // scroll-driven motion values (parallax)
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 900], [0, -50]);
  const ySlower = useTransform(scrollY, [0, 900], [0, -120]);
  const xSlow = useTransform(scrollY, [0, 900], [0, -30]);
  const xSlower = useTransform(scrollY, [0, 900], [0, 30]);

  const fruits = [
    "https://cdn-icons-png.flaticon.com/512/415/415733.png", // Apple
    "https://cdn-icons-png.flaticon.com/512/135/135620.png", // Lemon
    "https://cdn-icons-png.flaticon.com/512/4064/4064890.png", // Grapes
    "https://cdn-icons-png.flaticon.com/512/1046/1046869.png", // Strawberry
    "https://cdn-icons-png.flaticon.com/512/415/415734.png", // Orange
  ];

  return (
    <section className="relative bg-gray-50 py-20 overflow-hidden">
      {/* ===== Floating Fruits (background) ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => {
          const left = Math.round(Math.random() * 100);
          const size = Math.round(28 + Math.random() * 56);
          const duration = 12 + Math.random() * 10;
          const delay = Math.random() * 6;

          return (
            <motion.img
              key={i}
              src={fruits[i % fruits.length]}
              alt={`fruit-${i}`}
              className="absolute opacity-20"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: -80,
                // horizontal parallax based on scroll (no conflict with animate.y)
                x: i % 2 === 0 ? xSlow : xSlower,
              }}
              // vertical drifting + rotation (infinite loop)
              animate={{ y: [0, -1200], rotate: [0, 360] }}
              transition={{ duration, repeat: Infinity, ease: "linear", delay }}
            />
          );
        })}
      </div>

      {/* ===== Hero / Intro ===== */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative pt-8 pb-6"
          style={{ y: ySlow }}
        >
          {/* soft oval glow behind hero */}
          <div className="absolute inset-x-0 top-8 mx-auto h-44 w-[85%] rounded-full bg-gradient-to-r from-orange-100 to-rose-100 opacity-40 blur-3xl -z-10"></div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-orange-500">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500">Tasty Bites</span>
          </h1>

          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg">
            Since our inception in 2020, <span className="font-semibold">Tasty Bites</span> has been a culinary
            journey — crafting plates that tell a story. We combine seasonal ingredients, bold technique, and a warm
            atmosphere to make every visit memorable.
          </p>
        </motion.div>
      </div>

      {/* ===== Our Story (two-column with oval accent) ===== */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 mt-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} style={{ y: ySlower }}>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Story</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Born from a passion for food and community, Tasty Bites aims to be more than a meal — it’s a place for
            connection. From humble beginnings to a beloved local spot, we’re known for imaginative dishes and
            thoughtful hospitality.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="relative" style={{ y: ySlow }}>
          <div className="absolute -inset-6 rounded-[100px] bg-gradient-to-r from-orange-100 to-rose-50 blur-2xl opacity-70 -z-10"></div>
          <motion.img
            src="/restaurant_interior.jpg"
            alt="Restaurant interior"
            className="rounded-3xl shadow-2xl w-full object-cover"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          />
        </motion.div>
      </div>

      {/* ===== Our Mission (mirrored columns) ===== */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 mt-28 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="relative order-2 md:order-1" style={{ y: ySlow }}>
          <div className="absolute -inset-6 rounded-[80px] bg-gradient-to-r from-orange-100 to-rose-50 blur-2xl opacity-70 -z-10"></div>
          <motion.img
            src="/chief-cook.jpg"
            alt="Chef cooking"
            className="rounded-3xl shadow-2xl w-full object-cover"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          />
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="order-1 md:order-2" style={{ y: ySlower }}>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            To celebrate food that brings people together — seasonal, thoughtful, and served with heart. Our menus are
            created to surprise, delight, and reconnect diners to the joy of simple, skilled cooking.
          </p>
        </motion.div>
      </div>

      {/* ===== Our Values (interactive cards + rotate icons) ===== */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 mt-32">
        <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-3xl font-bold mb-10 text-center text-gray-900" style={{ y: ySlow }}>
          Our Values
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Freshness", desc: "Locally sourced, seasonal ingredients.", icon: "🥗" },
            { title: "Creativity", desc: "Bold flavors, thoughtful plating.", icon: "✨" },
            { title: "Community", desc: "A space for connection and celebration.", icon: "🤝" },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition"
              style={{ y: i % 2 === 0 ? ySlow : ySlower }}
            >
              <motion.div className="text-5xl mb-4 inline-block" whileHover={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                {v.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{v.title}</h3>
              <p className="text-gray-600 text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 mt-32 text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="bg-gradient-to-r from-orange-500 to-rose-500 text-white py-16 px-10 rounded-3xl shadow-2xl relative overflow-hidden" style={{ y: ySlow }}>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-6 right-6 text-5xl opacity-40">
            🍴
          </motion.div>

          <h2 className="text-4xl font-extrabold mb-4">Join Us at Tasty Bites</h2>
          <p className="mb-6 text-lg opacity-95">Experience the perfect blend of food, flavor, and community. Come dine with us and make lasting memories.</p>
          <a href="/menu" className="inline-block bg-white text-orange-600 font-semibold px-8 py-3 rounded-xl shadow hover:bg-gray-100 transition">
            Explore Our Menu →
          </a>
        </motion.div>
      </div>

      {/* spacing bottom so parallax has room */}
      <div style={{ height: 160 }} />
    </section>
  );
}
