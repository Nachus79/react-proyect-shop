import { useEffect, useState } from "react";
import { fetchGames } from "../utils/api"; 
import GameCard from "./GameCard";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await fetchGames(); 
        setGames(response); 
      } catch (err) {
        setError("Error fetching games");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center">Game List</h1>
      <div className="row">
        {games.map((game) => (
          <div className="col-md-4" key={game.id}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;