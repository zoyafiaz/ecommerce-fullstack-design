import { Link } from "react-router-dom";

function Navbar({ cartItems }) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <h2 className="logo">
        <Link to="/">ShopEase</Link>
      </h2>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/cart">Cart ({totalItems})</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;