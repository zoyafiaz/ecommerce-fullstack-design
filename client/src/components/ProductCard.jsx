import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h3>{product.name}</h3>
        <p>Rs. {product.price}</p>

        <Link to={`/products/${product.id}`} className="btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;