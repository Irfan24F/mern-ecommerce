import React, { useContext } from "react";
import { itemContext } from "../context/ItemContext";

const ProductItem = ({ product }) => {
    const { addToCart, removeFromCart } = useContext(itemContext);

    const handleAddToCart = () => addToCart(product);

    const handleRemoveFromCart = () => removeFromCart(product);

    return (
        <div className="product-card">
            <img
                className="product-image"
                src={`https://mern-ecommerce-1-ten.vercel.app${product.image}`}
                alt={product.title}
            />
            <div className="product-details">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>Price: {product.price} Rs</p>
                <p>{product.genre}</p>
                <p>{product.author}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={handleRemoveFromCart}>Remove from Cart</button>
            </div>
        </div>
    );
};

export default ProductItem;
