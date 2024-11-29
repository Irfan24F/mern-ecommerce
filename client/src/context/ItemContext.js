import { createContext, useState, useEffect, useCallback } from "react";

// Create the context
const itemContext = createContext();

// Define the CustomItemContext component
function CustomItemContext({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    return savedCart;
  });
  const [itemsInCart, setItemsInCart] = useState(cart.length);
  const [totalPrice, setTotalPrice] = useState(() =>
    cart.reduce((total, product) => total + product.price, 0)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mern-ecommerce-2-6s5z.onrender.com/api/books");
        if (!response.ok) throw new Error("Failed to fetch products");
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      setTotalPrice(updatedCart.reduce((total, item) => total + item.price, 0));
      setItemsInCart(updatedCart.length);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback((product) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((prdt) => prdt._id === product._id);
      if (index !== -1) {
        const updatedCart = prevCart.filter((_, i) => i !== index);
        setTotalPrice(updatedCart.reduce((total, item) => total + item.price, 0));
        setItemsInCart(updatedCart.length);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
      return prevCart;
    });
  }, []);

  return (
    <itemContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
        itemsInCart,
        totalPrice,
      }}
    >
      {children}
    </itemContext.Provider>
  );
}

// Export the context and default component
export { itemContext };
export default CustomItemContext;
