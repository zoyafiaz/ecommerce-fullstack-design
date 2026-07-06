import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  // Get fetchCart from Context
  const { fetchCart } = useCart();

  useEffect(() => {
    fetch(`e https:// (https://ecommerce-fullstack-design-production-9f4a.up.railway.app)/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  // Add to Cart
  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch("e https:// (https://ecommerce-fullstack-design-production-9f4a.up.railway.app)/api/cart/add", {
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

      // ⭐ Refresh cart count immediately
      await fetchCart();

      alert("✅ Product added to cart successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  if (!product) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="product-details">
      <img
        src={`e https:// (https://ecommerce-fullstack-design-production-9f4a.up.railway.app)/images/${product.image}`}
        alt={product.name}
        className="details-image"
      />

      <div className="details-info">
        <h2>{product.name}</h2>

        <p>
          <strong>Price:</strong> Rs. {product.price}
        </p>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>Stock:</strong> {product.stock}
        </p>

        <p>{product.description}</p>

        <div className="details-actions">
          <button className="btn" onClick={addToCart}>
            Add to Cart
          </button>

          <Link to="/products" className="btn secondary-btn">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;