import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchGames } from "../utils/api";
import GameCard from "../components/GameCard";

const SearchResults = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    const fetchData = async () => {
      const allGames = await fetchGames();
      const filteredGames = allGames.filter((game) =>
        game.name.toLowerCase().includes(query.toLowerCase())
      );
      setGames(filteredGames);
      setLoading(false);
    };

    fetchData();
  }, [query]);

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
      <h1 className="text-center text-white">Search Results for "{query}"</h1>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="row g-3">
          {games.length === 0 && (
            <p className="text-white">No results found.</p>
          )}
          {games.length > 0 &&
            games.map((game) => (
              <div className="col-md-3" key={game.id}>
                <GameCard
                  game={game}
                  price={getPrice(game.name)}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
