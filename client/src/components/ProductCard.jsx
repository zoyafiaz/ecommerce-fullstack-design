import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { fetchCart } = useCart();

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch("e https://ecommerce-fullstack-design-production-9f4a.up.railway.app/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Refresh cart count in Navbar
      await fetchCart();

      alert("✅ Product added to cart successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="product-card">
      <div className="product-badge">
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </div>

      <img
        src={`e https://ecommerce-fullstack-design-production-9f4a.up.railway.app/images/${product.image}`}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="product-price">
          Rs. {product.price}
        </p>

        <p className="product-category">
          {product.category}
        </p>

        <div className="product-buttons">
          <Link
            to={`/products/${product._id}`}
            className="btn"
          >
            View Details
          </Link>

          <button
            className="btn add-cart-btn"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;