import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <aside className="sidebar">

        <h2>🛒 Admin Panel</h2>

        <ul>

          <li>
            <Link to="/admin">📊 Dashboard</Link>
          </li>

          <li>
            <Link to="/admin/products">📦 Products</Link>
          </li>

          <li>
            <Link to="/admin/add-product">➕ Add Product</Link>
          </li>

          <li>
            <Link to="/admin/users">👥 Users</Link>
          </li>

          <li>
            <Link to="/admin/orders">📑 Orders</Link>
          </li>

          <li>
            <Link to="/login">🚪 Logout</Link>
          </li>

        </ul>

      </aside>

      <main className="content">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;