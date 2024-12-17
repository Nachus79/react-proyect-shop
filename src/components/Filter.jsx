import React, { useEffect, useState } from "react";
import { fetchGames } from "../utils/api";
import Filter from "../components/Filter";
import GameCard from "../components/GameCard";
const Home = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  /*ESTADOS PARA LOS FILTROS */
  const [priceFilter, setPriceFilter] = useState(0);
  const [metacriticFilter, setMetacriticFilter] = useState("asc");
  const [ratingsFilter, setRatingsFilter] = useState("asc");
  const [releaseDateFilter, setReleaseDateFilter] = useState("");
  useEffect(() => {
    const loadGames = async () => {
      try {
        const gamesData = await fetchGames();
        setGames(gamesData);
        setFilteredGames(gamesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    loadGames();
  }, []);
  const applyFilters = () => {
    let filtered = [...games];
    //BARRA PARA EL PRECIO (¿CAMBIAR A DESPLEGABLE?)
    if (priceFilter > 0) {
      filtered = filtered.filter((game) => getPrice(game.name) <= priceFilter);
    }
    //FILTRO PARA EL ORDEN SEGÚN LA PUNTUACIÓN DE METACRITIC
    if (metacriticFilter !== "") {
      filtered = filtered.sort((a, b) =>
        metacriticFilter === "asc"
          ? a.metacritic - b.metacritic //DE MAYOR A MENOR
          : b.metacritic - a.metacritic //DE MENOR A MAYOR
      );
    }
    //FILTRO PARA EL ORDEN SEGÚN LA PUNTUACIÓN
    if (ratingsFilter !== "") {
      filtered = filtered.sort((a, b) =>
        ratingsFilter === "asc"
          ? a.rating - b.rating //DE MAYOR A MENOR
          : b.rating - a.rating //DE MENOR A MAYOR
      );
    }
    //FILTRO PARA LA ORDENACIÓN POR ANTIGÜEDAD
    if (releaseDateFilter) {
      if (releaseDateFilter === "recent") {
        filtered = filtered.sort((a, b) => new Date(b.released) - new Date(a.released)); //MÁS RECIENTES
      } else if (releaseDateFilter === "older") {
        filtered = filtered.sort((a, b) => new Date(a.released) - new Date(b.released)); //MÁS ANTIGUOS
      }
    }
    setFilteredGames(filtered);
  };
  useEffect(() => {
    applyFilters();
  }, [priceFilter, metacriticFilter, ratingsFilter, releaseDateFilter]);
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
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredGames.map((game) => (
            <div className="col-md-4" key={game.id}>
              <GameCard
              game={game}
              price={getPrice(game.name)}
              onAddToCart={handleAddToCart} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Home;