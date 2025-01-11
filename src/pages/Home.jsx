import { useEffect, useState } from "react";
import { fetchGames } from "../utils/api";
import Filter from "../components/Filter";
import GameCard from "../components/GameCard";

const Home = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  /* ESTADOS PARA LOS FILTROS */
  const [priceFilter, setPriceFilter] = useState(0);
  const [metacriticFilter, setMetacriticFilter] = useState("");
  const [ratingsFilter, setRatingsFilter] = useState("");
  const [releaseDateFilter, setReleaseDateFilter] = useState("");

  useEffect(() => {
    const loadGames = async () => {
      try {
        const gamesData = await fetchGames(currentPage);
        setGames(gamesData);
        applyFilters(gamesData); // Aplica filtros a los juegos obtenidos
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    loadGames();
  }, [currentPage]); // Cargar juegos cuando cambie la página

  const applyFilters = (gamesData) => {
    let filtered = [...gamesData];

    // Aplicar filtros solo si están activos
    if (priceFilter > 0) {
      filtered = filtered.filter((game) => getPrice(game.name) <= priceFilter);
    }
    if (metacriticFilter) {
      const sortByMetacritic = (a, b) => {
        return metacriticFilter === "asc"
          ? a.metacritic - b.metacritic
          : b.metacritic - a.metacritic;
      };
      filtered.sort(sortByMetacritic);
    }
    if (ratingsFilter) {
      const sortByRating = (a, b) => {
        return ratingsFilter === "asc"
          ? a.rating - b.rating
          : b.rating - a.rating;
      };
      filtered.sort(sortByRating);
    }
    if (releaseDateFilter) {
      if (releaseDateFilter === "recent") {
        filtered = filtered.sort(
          (a, b) => new Date(b.released) - new Date(a.released)
        );
      } else if (releaseDateFilter === "older") {
        filtered = filtered.sort(
          (a, b) => new Date(a.released) - new Date(b.released)
        );
      }
    }

    setFilteredGames(filtered);
  };

  useEffect(() => {
    applyFilters(games); // Aplica filtros cada vez que cambie un filtro
  }, [priceFilter, metacriticFilter, ratingsFilter, releaseDateFilter, games]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Evita que la página sea menor que 1
  };

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

  const handleAddToCart = (game) => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    storedItems.push(game);
    localStorage.setItem("cart", JSON.stringify(storedItems));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Game Store</h1>
      <Filter
        onPriceFilter={setPriceFilter}
        onMetacriticFilter={setMetacriticFilter}
        onRatingsFilter={setRatingsFilter}
        onReleaseDateFilter={setReleaseDateFilter}
      />
      <div className="row g-3">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredGames.map((game) => (
            <div className="col-md-3" key={game.id}>
              <GameCard
                game={game}
                price={getPrice(game.name)}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))
        )}
      </div>
      {/* Menú de navegación de páginas */}
      <div className="d-flex justify-content-between align-items-center mt-4 mb-5">
        <button
          className="btn btn-secondary btn-warning"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span>Page {currentPage}</span>
        <button
          className="btn btn-secondary btn-warning"
          onClick={handleNextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Home;
