import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`e https:// (https://ecommerce-fullstack-design-production-9f4a.up.railway.app)/api/products/${id}`);
      const data = await res.json();

      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`e https:// (https://ecommerce-fullstack-design-production-9f4a.up.railway.app)/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("✅ Product Updated Successfully");

      navigate("/admin/products");

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Update Product
        </button>

      </form>
    </div>
  );
}

export default EditProduct;