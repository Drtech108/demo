// src/context/CartProvider.tsx
import { useState } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import type { CartItem, CartContextType } from "./CartContext";

/** Provider component — returns JSX so this file is .tsx */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart: CartContextType["addToCart"] = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart: CartContextType["removeFromCart"] = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const increaseQuantity: CartContextType["increaseQuantity"] = (id) => {
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c)));
  };

  const decreaseQuantity: CartContextType["decreaseQuantity"] = (id) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: Math.max(c.quantity - 1, 0) } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const clearCart: CartContextType["clearCart"] = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
