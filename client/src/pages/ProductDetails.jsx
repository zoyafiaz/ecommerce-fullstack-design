import { useParams, Link } from "react-router-dom";
import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Product not found</h2>
        <p>This product id does not exist.</p>
        <Link to="/products">Go Back to Products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "320px",
            maxWidth: "100%",
            borderRadius: "10px",
          }}
        />

        <div style={{ maxWidth: "500px" }}>
          <h2>{product.name}</h2>
          <p><strong>Price:</strong> Rs. {product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Description:</strong> {product.description}</p>

          <button
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              border: "none",
              backgroundColor: "black",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;