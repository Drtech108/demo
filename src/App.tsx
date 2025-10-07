// src/App.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmed from "./pages/OrderConfirmed";
import AdminOrders from "./pages/AdminOrders";
import AdminMessages from "./pages/AdminMessages";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function App() {
  const location = useLocation();

  const withMotion = (children: React.ReactNode) => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public pages */}
            <Route path="/" element={withMotion(<Home />)} />
            <Route path="/menu" element={withMotion(<Menu />)} />
            <Route path="/about" element={withMotion(<About />)} />
            <Route path="/contact" element={withMotion(<Contact />)} />
            <Route path="/cart" element={withMotion(<Cart />)} />
            <Route path="/checkout" element={withMotion(<Checkout />)} />
            <Route path="/payment" element={withMotion(<Payment />)} />
            <Route path="/order-confirmed" element={withMotion(<OrderConfirmed />)} />

            {/* Admin routes */}
            <Route path="/admin">
              <Route index element={<p className="p-6">Select a section (Orders / Messages)</p>} />
              <Route path="orders" element={withMotion(<AdminOrders />)} />
              <Route path="messages" element={withMotion(<AdminMessages />)} />
            </Route>
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
