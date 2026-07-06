import { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // ===========================
  // Fetch Cart
  // ===========================
  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("e https://ecommerce-fullstack-design-production-9f4a.up.railway.app/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setCartItems(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ===========================
  // Increase Quantity
  // ===========================
  const increaseQuantity = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`e https://ecommerce-fullstack-design-production-9f4a.up.railway.app/api/cart/increase/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCart();
  };

  // ===========================
  // Decrease Quantity
  // ===========================
  const decreaseQuantity = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`e https://ecommerce-fullstack-design-production-9f4a.up.railway.app/api/cart/decrease/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCart();
  };

  // ===========================
  // Remove Item
  // ===========================
  const removeItem = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`e https://ecommerce-fullstack-design-production-9f4a.up.railway.app/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCart();
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("e https://ecommerce-fullstack-design-production-9f4a.up.railway.app/api/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("🎉 Order placed successfully!");

    // Reload the cart (it will now be empty)
    fetchCart();

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <h3>Your cart is empty.</h3>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img
                src={`e https://ecommerce-fullstack-design-production-9f4a.up.railway.app/images/${item.image}`}
                alt={item.name}
                width="120"
              />

              <div>
                <h3>{item.name}</h3>

                <p>Price: Rs. {item.price}</p>

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>

                  <strong>{item.quantity}</strong>

                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                </div>

                <p>
                  <strong>Subtotal:</strong> Rs. {item.price * item.quantity}
                </p>

                <button onClick={() => removeItem(item._id)}>
                  Remove
                </button>
              </div>

              <hr />
            </div>
          ))}

          <h2>Total: Rs. {total}</h2>

          <button className="btn" onClick={handleCheckout}>
  Proceed to Checkout
</button>
        </>
      )}
    </div>
  );
}

export default Cart;