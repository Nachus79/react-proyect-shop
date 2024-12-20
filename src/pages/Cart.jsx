import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedItems);
  }, []);

  const getPrice = (name) => {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      let charCode = name.charCodeAt(i);
      sum += charCode * (i + 1);
    }
    let hashValue = sum % 1000;
    let price = 10 + (hashValue / 1000) * 60;
    return price.toFixed(2);
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemToRemove.id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cartItems
    .reduce((total, item) => total + parseFloat(getPrice(item.name)), 0)
    .toFixed(2);

  const handlePay = () => {
    window.location.href = "/"; // Redirige a la página de inicio
  };

  const handleGameInfo = (gameId) => {
    navigate(`/games/${gameId}`); // Redirige a la página de detalles del juego
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-white">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={item.id}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.background_image}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "auto",
                      marginRight: "10px",
                    }}
                  />
                  <span className="text-dark">{item.name}</span>
                </div>
                <div className="d-flex align-items-center">
                  <span className="text-success">${getPrice(item.name)}</span>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-info ml-2"
                    onClick={() => handleGameInfo(item.id)} // Redirige a la página de detalles del juego
                  >
                    INFO
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="mt-3 text-white">
            Total: <span className="text-success">${totalAmount}</span>
          </h3>
          <button className="btn btn-warning mt-3" onClick={handlePay}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
