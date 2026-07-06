import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("e https://ecommerce-fullstack-design-production-9f4a.up.railway.app/api/dashboard");
      const data = await res.json();

      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      <h1>📊 Admin Dashboard</h1>

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
    </div>
  );
}

export default Dashboard;