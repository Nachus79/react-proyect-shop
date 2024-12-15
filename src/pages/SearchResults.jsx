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

  return (
    <div className="container mt-5">
      <h1 className="text-center text-white">Search Results for "{query}"</h1>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="row">
          {games.length === 0 ? (
            <p className="text-white">No results found.</p>
          ) : (
            games.map((game) => (
              <div className="col-md-4" key={game.id}>
                <GameCard
                  game={game}
                  price={game.price}
                  onAddToCart={() => {}}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
