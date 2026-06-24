import { useParams, Link } from "react-router-dom";
import products from "../data/Products";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Product not found</h2>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="product-details">
      <img
        src={product.image}
        alt={product.name}
        className="details-image"
      />

      <div className="details-info">
        <h2>{product.name}</h2>
        <p><strong>Price:</strong> Rs. {product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p>{product.description}</p>

        <div className="details-actions">
          <button className="btn" onClick={() => addToCart(product)}>
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