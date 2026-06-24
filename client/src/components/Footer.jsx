import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-box">
          <h3>ShopEase</h3>
          <p>
            Your one-stop online shop for fashion, accessories, shoes, and electronics.
          </p>
        </div>

        <div className="footer-box">
          <h3>Quick Links</h3>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/products">Products</Link></p>
          <p><Link to="/cart">Cart</Link></p>
        </div>

        <div className="footer-box">
          <h3>Contact</h3>
          <p>Email: support@shopease.com</p>
          <p>Phone: +92 300 1234567</p>
          <p>Pakistan</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;