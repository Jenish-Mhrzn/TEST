import React, { useState } from "react";
import "./style.css";

const productsData = [
  { id: 1, name: "Mouse", price: 500 },
  { id: 2, name: "Keyboard", price: 1500 },
  { id: 3, name: "Laptop", price: 60000 },
  { id: 4, name: "Mobile", price: 10000 }
];

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  // Remove functions
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const removeFromCart = (id) => {
  const exists = cart.find((item) => item.id === id);

  if (exists.qty > 1) {
    // Decrease quantity by 1
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
    );
  } else {
    // Remove item completely
    setCart(cart.filter((item) => item.id !== id));
  }
};


  // Checkout calculations
  const totalPrice = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const discount = totalPrice > 5000 ? totalPrice * 0.1 : 0;
  const vat = (totalPrice - discount) * 0.13;
  const finalAmount = totalPrice - discount + vat;

  return (
    <div className="container">
      <h1 className="title">Simple React E-Commerce</h1>

      {/* Product Section */}
      <h2 className="section-title">Products</h2>
      <div className="product-list">
        {productsData.map((product) => (
          <div className="product-card" key={product.id}>
            <p>{product.name} - Rs {product.price}</p>
            <div>
              <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
              <button className="btn wishlist-btn" onClick={() => addToWishlist(product)}>Wishlist</button>
            </div>
          </div>
        ))}
      </div>

      {/* Wishlist Section */}
      <h2 className="section-title">Wishlist</h2>
      <div className="wishlist-box">
        {wishlist.length === 0 && <p>No items in wishlist</p>}
        {wishlist.map((item) => (
          <p key={item.id}>
            {item.name}
            <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>✖</button>
          </p>
        ))}
      </div>

      {/* Cart Section */}
      <h2 className="section-title">Cart</h2>
      <div className="cart-box">
        {cart.length === 0 && <p>No products added</p>}
        {cart.map((item) => (
          <p key={item.id}>
            {item.name} - Rs {item.price} x {item.qty}
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✖</button>
          </p>
        ))}
      </div>

      {/* Checkout Section */}
      <h2 className="section-title">Checkout</h2>
      <div className="checkout-box">
        <p>Total: Rs {totalPrice}</p>
        <p>Discount: Rs {discount}</p>
        <p>VAT (13%): Rs {vat.toFixed(2)}</p>
        <h3>Final Amount: Rs {finalAmount.toFixed(2)}</h3>
      </div>
      
      <h1>PAY rs :  {finalAmount.toFixed(2)}</h1>
    </div>

    

  );
}

export default App;
