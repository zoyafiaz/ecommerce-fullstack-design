import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// User Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminProducts from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import AdminOrders from "./pages/admin/AdminOrders";

// Admin Layout
import AdminLayout from "./layouts/AdminLayout";

// Protected Route
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>

        {/* ================= USER ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Dashboard */}
          <Route
            index
            element={<Dashboard />}
          />

          {/* Products */}
          <Route
            path="products"
            element={<AdminProducts />}
          />

          {/* Add Product */}
          <Route
            path="add-product"
            element={<AddProduct />}
          />

          {/* Edit Product */}
          <Route
            path="edit-product/:id"
            element={<EditProduct />}
          />

          {/* Users */}
          <Route
            path="users"
            element={<Users />}
          />

          {/* Orders */}
          <Route
            path="orders"
            element={<AdminOrders />}
          />
        </Route>

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;