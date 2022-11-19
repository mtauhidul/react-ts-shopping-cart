import { createContext, useContext, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseItemQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      item.quantity++;
    } else {
      cartItems.push({ id, quantity: 1 });
    }
    setCartItems([...cartItems]);
  };

  const decreaseItemQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      item.quantity--;
    }
    setCartItems([...cartItems]);
  };

  const removeFromCart = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      item.quantity = 0;
    }
    setCartItems([...cartItems]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
