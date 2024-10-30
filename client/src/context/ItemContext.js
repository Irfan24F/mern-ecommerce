import { createContext, useEffect, useState, useCallback } from "react";

const itemContext = createContext();

function CustomItemContext({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        // Load cart from local storage if available
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [itemsInCart, setItemsInCart] = useState(cart.length);
    const [totalPrice, setTotalPrice] = useState(() => {
        // Calculate initial total price from saved cart
        return cart.reduce((total, product) => total + product.price, 0);
    });

<<<<<<< HEAD
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://ecommerce-bookstore-website-using-mern-stack-mb1d.vercel.app/");
                if (!response.ok) throw new Error("Failed to fetch products");
                const products = await response.json();
                console.log(products);
                setProducts(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
=======
	useEffect(() => {
	
		const fetchData = async () => {
			const response = await fetch("https://ecommerce-bookstore-website-using-mern.onrender.com");
			const products = await response.json();
			console.log(products);
			setProducts(products);
		};
>>>>>>> origin/main

        fetchData();
    }, []);

    const addToCart = useCallback((product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        setTotalPrice(updatedCart.reduce((total, item) => total + item.price, 0));
        setItemsInCart(updatedCart.length);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart to local storage
    }, [cart]);

    const removeFromCart = useCallback((product) => {
        const index = cart.findIndex((prdt) => prdt._id === product._id);
        if (index !== -1) {
            const updatedCart = cart.filter((_, i) => i !== index);
            setCart(updatedCart);
            setTotalPrice(updatedCart.reduce((total, item) => total + item.price, 0));
            setItemsInCart(updatedCart.length);
            localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to local storage
        } else {
            console.log("Item not found in the cart");
        }
    }, [cart]);

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

export { itemContext };
export default CustomItemContext;
