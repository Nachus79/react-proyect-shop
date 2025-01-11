import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchGames } from "../utils/api";

const Navbar = ({ cartItems }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm) {
        const allGames = await fetchGames();
        const filteredGames = allGames.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filteredGames);
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm(""); // Limpiar el campo de búsqueda
      setSuggestions([]); // Limpiar las sugerencias
    }
  };

  const handleSuggestionClick = (gameId) => {
    navigate(`/games/${gameId}`); // Redirige a la página de detalles del juego
    setSearchTerm(""); // Limpiar el campo de búsqueda
    setSuggestions([]); // Limpiar las sugerencias
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#8A2BE2" }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">

        {/* EN ESTE DIV ESTÁN CONTENIDOS LOS DOS PRIMEROS BOTONES: "HOME" Y "CART"*/}
 
        <div className="d-flex">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="btn btn-light"
                to="/"
                style={{
                  fontWeight: "bold",
                  padding: "5px 10px",
                  marginRight: "5px",
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-light"
                to="/cart"
                style={{
                  fontWeight: "bold",
                  padding: "5px 10px",
                }}
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/*DIV PARA CONTENER EL TÍTULO DE LA PÁGINA */}

        <div className="d-flex justify-content-center align-items-center">
        
          <Link
            className="navbar-brand"
            to="/"
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
            }}
          >
            Players & Vicious
          </Link>
        </div>

        {/*DIV PARA CONTENER EL ESPACIO Y EL BOTÓN DE BÚSQUEDA */}

        <div className="d-flex">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-warning"
              style={{
                color: "black",
                fontWeight: "bold",
                marginLeft: "5px",
              }}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {suggestions.length > 0 && (
        <ul
          className="list-group position-absolute"
          style={{
            zIndex: 1000,
            width: "100%",
            maxWidth: "300px", // Anchura máxima igual a la barra de búsqueda
            maxHeight: "200px", // Altura máxima doble que la barra de búsqueda
            overflowY: "auto", // Agregar scrollbar si es necesario
            top: "100%",
            left: "76.90%",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          {suggestions.map((game) => (
            <li
              key={game.id}
              className="list-group-item list-group-item-action d-flex align-items-center"
              onClick={() => handleSuggestionClick(game.id)}
            >
              <div style={{ flex: "0 0 30%", height: "100%" }}>
                <img
                  src={game.background_image}
                  alt={game.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div style={{ flex: "1", paddingLeft: "10px" }}>
                <span>{game.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
