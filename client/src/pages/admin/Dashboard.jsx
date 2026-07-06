import { useEffect, useState } from "react";
import "./Dashboard.css";

// 📊 Recharts imports
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    latestUsers: [],
    lowStockProducts: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await fetch("e https:// (https://ecommerce-fullstack-design-production-9f4a.up.railway.app)/api/dashboard");
      const data = await res.json();

      setStats(data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📊 TEST DATA (FOR CHART)
  const testData = [
    { date: "Mon", revenue: 1000 },
    { date: "Tue", revenue: 2000 },
    { date: "Wed", revenue: 1500 },
    { date: "Thu", revenue: 2500 },
    { date: "Fri", revenue: 1800 },
  ];

  // ⏳ LOADING SCREEN
  if (loading) {
    return (
      <div className="dashboard">
        <h2>⏳ Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className={darkMode ? "dashboard dark" : "dashboard"}>

      <h1>📊 Admin Dashboard</h1>

      {/* 🌙 DARK MODE BUTTON */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: "10px 15px",
          marginBottom: "20px",
          border: "none",
          cursor: "pointer",
          borderRadius: "8px",
          background: darkMode ? "#fff" : "#333",
          color: darkMode ? "#333" : "#fff",
        }}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* DASHBOARD CARDS */}
      <div className="stats">
        <div className="card products">
          <h3>📦 Products</h3>
          <h2>{stats.totalProducts}</h2>
        </div>

        <div className="card users">
          <h3>👥 Users</h3>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div className="card orders">
          <h3>📑 Orders</h3>
          <h2>{stats.totalOrders}</h2>
        </div>

        <div className="card revenue">
          <h3>💰 Revenue</h3>
          <h2>Rs. {stats.totalRevenue}</h2>
        </div>
      </div>

      {/* 📈 SALES CHART */}
      <div className="recent-orders">
        <h2>📈 Sales Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={testData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#3498db" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* RECENT ORDERS */}
      <div className="recent-orders">
        <h2>🕒 Recent Orders</h2>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {stats.recentOrders?.length ? (
              stats.recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(-6)}</td>
                  <td>{order.status}</td>
                  <td>Rs. {order.totalPrice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="empty-state">
                  🚫 No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* LATEST USERS */}
      <div className="recent-orders">
        <h2>👥 Latest Users</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {stats.latestUsers?.length ? (
              stats.latestUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="empty-state">
                  🚫 No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* LOW STOCK */}
      <div className="recent-orders low-stock">
        <h2>⚠️ Low Stock Products</h2>

        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {stats.lowStockProducts?.length ? (
              stats.lowStockProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td style={{ color: "red", fontWeight: "bold" }}>
                    {product.stock}
                  </td>
                  <td>Rs. {product.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="empty-state">
                  🚫 No Low Stock Products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;