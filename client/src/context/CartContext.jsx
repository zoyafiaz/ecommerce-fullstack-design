import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await fetch("https://ecommerce-fullstack-design-production-9f4a.up.railway.app/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        const total = data.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        setCartCount(total);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);