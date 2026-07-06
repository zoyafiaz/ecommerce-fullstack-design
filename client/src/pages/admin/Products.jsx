import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("✅ Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>All Products</h1>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.id}</td>

              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  width="60"
                />
              </td>

              <td>{product.name}</td>

              <td>Rs. {product.price}</td>

              <td>{product.category}</td>

              <td>
                <Link to={`/admin/edit-product/${product._id}`}>
                  <button
                    style={{
                      marginRight: "10px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => deleteProduct(product._id)}
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;