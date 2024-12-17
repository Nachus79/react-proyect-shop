import React from "react";
import { useNavigate } from "react-router-dom";

const GameCard = ({ game, price, onAddToCart }) => {
  const navigate = useNavigate(); // Hook para la navegación

  const handleInfo = () => {
    navigate(`/games/${game.id}`); // Redirige a la página de detalles del juego
  };

  return (
    <div className="card h-100 d-flex flex-column">
      <div className="image-container">
        <img
          src={game.background_image}
          className="card-img-top"
          alt={game.name}
        />
      </div>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title text-dark text-center">{game.name}</h5>
          <p className="card-text text-success text-center">Price: ${price}</p>
        </div>
        <div className="d-flex justify-content-between mt-auto">
          <button className="btn btn-warning" onClick={() => onAddToCart(game)}>
            Add to Cart
          </button>
          <button className="btn btn-info ml-2" onClick={handleInfo}>
            INFO
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
