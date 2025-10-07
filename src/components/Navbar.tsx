import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50 m-0 p-0">
      <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-600">
          Tasty Bites
        </Link>

        {/* Desktop Links + Cart aligned right */}
        <div className="flex items-center gap-6 ml-auto">
          <div className="hidden md:flex gap-6">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `hover:text-orange-600 transition ${
                    isActive ? "text-orange-600 font-semibold" : "text-gray-700"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Cart & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden text-gray-700 hover:text-orange-600"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow px-6 pb-4 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `hover:text-orange-600 transition ${
                  isActive ? "text-orange-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
