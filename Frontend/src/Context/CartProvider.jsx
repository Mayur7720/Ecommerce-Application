import { createContext, useState, useContext } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartContext.Provider value={{ isDialogOpen, setIsDialogOpen,cartItems,setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
