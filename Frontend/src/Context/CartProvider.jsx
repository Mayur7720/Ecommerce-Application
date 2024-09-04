import { createContext, useState, useContext } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <CartContext.Provider value={{ isDialogOpen, setIsDialogOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
