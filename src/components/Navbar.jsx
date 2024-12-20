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

  const handleSuggestionClick = (gameName) => {
    setSearchTerm(gameName);
    navigate(`/search?query=${gameName}`); // Realizar la búsqueda automáticamente
    setSuggestions([]); // Limpiar las sugerencias
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#8A2BE2" }}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-start">
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
                  marginRight: "5px",
                }}
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex justify-content-center flex-grow-1">
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

        <div className="d-flex justify-content-end">
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
          style={{ zIndex: 1000, width: "100%", top: "100%" }}
        >
          {suggestions.map((game) => (
            <li
              key={game.id}
              className="list-group-item list-group-item-action d-flex align-items-center"
              onClick={() => handleSuggestionClick(game.name)}
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

