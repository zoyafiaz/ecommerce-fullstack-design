import { Link } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home() {
  const featuredProducts = products.slice(0, 8);

  const categories = [
    "Clothing",
    "Shoes",
    "Accessories",
    "Electronics",
  ];

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopEase</h1>
          <p>
            Discover trendy fashion, stylish accessories, and modern electronics
            all in one place.
          </p>
          <Link to="/products" className="btn">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div className="category-card" key={index}>
              <h3>{category}</h3>
              <p>Explore our best {category.toLowerCase()} collection.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sale Banner */}
      <section className="sale-banner">
        <h2>Big Summer Sale - Up to 40% Off!</h2>
        <p>Grab your favorite products before the offer ends.</p>
        <Link to="/products" className="btn">
          Shop Sale
        </Link>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h2>Subscribe to our Newsletter</h2>
        <p>Get updates about new arrivals, offers, and discounts.</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button className="btn">Subscribe</button>
        </div>
      </section>
    </div>
  );
}

export default Home;