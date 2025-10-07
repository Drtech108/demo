// src/hooks/useCart.ts
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import type { CartContextType } from "../context/CartContext";

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
