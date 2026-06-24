import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <div className="product-badge">
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </div>

      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">Rs. {product.price}</p>
        <p className="product-category">{product.category}</p>

        <div className="product-buttons">
          <Link to={`/products/${product.id}`} className="btn">
            View Details
          </Link>

          <button className="btn add-cart-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;