import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  // Newsletter State
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const featuredProducts = products.slice(0, 8);

  const categories = [
    "Clothing",
    "Shoes",
    "Accessories",
    "Electronics",
  ];

  // Newsletter Function
  const handleSubscribe = () => {
    if (email.trim() === "") {
      setMessage("❌ Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage("❌ Please enter a valid email address.");
      return;
    }

    setMessage("✅ Thank you for subscribing!");
    setEmail("");

    // Hide message after 3 seconds
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopEase</h1>

          <p>
            Discover trendy fashion, stylish accessories, and modern
            electronics all in one place.
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
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <h2>Shop by Category</h2>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${category}`}
              className="category-card"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <h3>{category}</h3>

              <p>
                Explore our best {category.toLowerCase()} collection.
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Sale Banner */}
      <section className="sale-banner">
        <h2>Big Summer Sale - Up to 40% Off!</h2>

        <p>
          Grab your favorite products before the offer ends.
        </p>

        <Link to="/products" className="btn">
          Shop Sale
        </Link>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h2>Subscribe to our Newsletter</h2>

        <p>
          Get updates about new arrivals, offers, and discounts.
        </p>

        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="btn"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>

        {message && (
          <p
            style={{
              marginTop: "15px",
              fontWeight: "bold",
              color: message.includes("✅")
                ? "green"
                : "red",
            }}
          >
            {message}
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;