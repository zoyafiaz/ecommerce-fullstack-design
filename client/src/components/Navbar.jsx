import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();

  const { cartCount } = useCart();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    // Refresh page after logout
    window.location.reload();
  };

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
          <Link to="/cart">Cart ({cartCount})</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/orders">My Orders</Link>
            </li>

            <li>
              <span>Hi, {user.name}</span>
            </li>

            <li>
              <button onClick={handleLogout} className="btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;