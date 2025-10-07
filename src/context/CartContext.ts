// src/context/CartContext.ts
import { createContext } from "react";

export type CartItem = {
  id: number;
  title: string;
  price: string; // e.g. "$12.00"
  img: string;
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);
