import { useEffect, useState } from "react";
import GameList from "./components/GameList";
import Navbar from "./components/Navbar";
import axios from "axios";

const App = () => {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("all");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
        );
        const gamesData = response.data.map((deal) => ({
          id: deal.dealID,
          title: deal.title,
          description: `Precio normal: $${deal.normalPrice}`,
          price: parseFloat(deal.salePrice),
          normalPrice: parseFloat(deal.normalPrice),
          thumb: deal.thumb,
          dealLink: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
          rating: parseFloat(deal.dealRating) || 0,
          internalName: deal.internalName || deal.title,
        }));

        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  const filteredGames = games.filter((game) => {
    if (filter === "all") {
      return true;
    }
    if (filter === "internalName") {
      return game.internalName.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortOption === "dealRating") {
      return (b.rating || 0) - (a.rating || 0);
    } else if (sortOption === "salePrice") {
      return (a.price || Infinity) - (b.price || Infinity);
    } else if (sortOption === "internalName") {
      return (a.internalName || a.title || "").localeCompare(
        b.internalName || b.title || ""
      );
    } else if (sortOption === "normalPrice") {
      return (a.normalPrice || Infinity) - (b.normalPrice || Infinity);
    }
    return 0;
  });

  return (
    <div className="app">
      <Navbar
        onFilterChange={setFilter}
        onSearch={setSearchTerm}
        onSortChange={setSortOption}
      />
      <div className="container mt-5 pt-5">
        <h1 className="text-center mb-4">Videogames</h1>
        <div className="row">
          <GameList games={sortedGames} />
        </div>
      </div>
    </div>
  );
};

export default App;
