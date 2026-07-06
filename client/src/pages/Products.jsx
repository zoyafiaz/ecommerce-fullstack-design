import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [searchParams] = useSearchParams();

  const categoryFromURL = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromURL || "All"
  );

  const categories = [
    "All",
    "Clothing",
    "Shoes",
    "Accessories",
    "Electronics",
  ];

  useEffect(() => {
    fetch("e https://ecommerce-fullstack-design-production-9f4a.up.railway.app/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    } else {
      setSelectedCategory("All");
    }
  }, [categoryFromURL]);

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category.toLowerCase() ===
        selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page">
      <section className="section">
        <h2>All Products</h2>

        <div className="products-topbar">
          <input
            type="text"
            placeholder="🔍 Search by product or category..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "active-filter" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Products;