import { useNavigate } from "react-router-dom";

const GameCard = ({ game, price, onAddToCart }) => {
  const navigate = useNavigate();

  const handleInfo = () => {
    navigate(`/games/${game.id}`);
  };

  // Función para asignar un color a cada género
  // Función para asignar un color a cada género
  const getGenreColor = (genreName) => {
    const colors = {
      Action: "bg-danger", // Rojo
      Adventure: "bg-warning", // Amarillo
      RPG: "bg-success", // Verde
      Shooter: "bg-info", // Azul claro
      Sports: "bg-primary", // Azul
      Puzzle: "bg-secondary", // Gris
      Strategy: "bg-dark", // Negro
      Horror: "bg-light", // Color claro
      Simulation: "bg-info", // Azul claro
      Indie: "bg-success", // Verde
      Racing: "bg-warning", // Amarillo
      Fighting: "bg-danger", // Rojo
      Platformer: "bg-secondary", // Gris
      Casual: "bg-light", // Color claro
      Educational: "bg-info", // Azul claro
      Card: "bg-warning", // Amarillo
      Board: "bg-secondary", // Gris
      MMO: "bg-primary", // Azul
    };
    return colors[genreName] || "bg-light";
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
          <h5 className="card-title text-dark text-center text-truncate">
            {game.name}
          </h5>
          <p className="card-text text-success text-center">Price: ${price}</p>

          <div className="genres my-2">
            <h6>Genres:</h6>
            {game.genres && game.genres.length > 0 ? (
              game.genres.map((genre) => (
                <span
                  key={genre.id}
                  className={`badge ${getGenreColor(genre.name)} me-1`}
                >
                  {genre.name}
                </span>
              ))
            ) : (
              <span className="text-muted">No genres available</span>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between mt-auto">
          <button className="btn btn-warning" onClick={() => onAddToCart(game)}>
            Add to Cart
          </button>
          <button className="btn btn-info ms-2" onClick={handleInfo}>
            INFO
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
