import React, { useEffect, useState } from "react";
import { fetchGames } from "../utils/api"; // Asegúrate de que esta función esté correctamente importada
import GameCard from "./GameCard"; // Asegúrate de que este componente esté creado para mostrar cada juego

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;

  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await fetchGames(); // Llama a la función que hace la solicitud a la API
        setGames(response); // Asigna los resultados al estado
      } catch (err) {
        setError("Error fetching games");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Calcular los juegos a mostrar en la página actual
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(games.length / gamesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center">Game List</h1>
      <div className="row">
        {currentGames.map((game) => (
          <div className="col-md-4" key={game.id}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="text-center mt-3">
        <p>Page {currentPage} of {totalPages}</p>
      </div>
    </div>
  );
};

export default GameList;