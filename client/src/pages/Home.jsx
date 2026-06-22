import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Home() {
  const featuredProducts = products;

  return (
    <div className="page">
      <section className="hero">
        <h1>Welcome to ShopEase</h1>
        <p>Your one-stop online store for fashion, accessories, and electronics.</p>
        <Link to="/products" className="btn">
          Shop Now
        </Link>
      </section>

      <section className="section">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;