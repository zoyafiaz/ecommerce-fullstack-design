import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("https://ecommerce-fullstack-design-production-9f4a.up.railway.app/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <h3>No orders found.</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3>Order</h3>

            <p><strong>Status:</strong> {order.status}</p>

            <p><strong>Total:</strong> Rs. {order.totalPrice}</p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <hr />

            {order.products.map((item, index) => (
              <div key={index}>
                <p>
                  {item.name} × {item.quantity} — Rs. {item.price}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;