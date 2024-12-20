import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../utils/api";
import DOMPurify from 'dompurify';

const GameDetails = () => {
  const { id } = useParams(); // Obtiene el ID del juego de la URL
  const [game, setGame] = useState(null); // Estado para almacenar los detalles del juego
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const loadGameDetails = async () => {
      try {
        const gameData = await fetchGameDetails(id); // Llama a la API para obtener los detalles del juego
        setGame(gameData); // Almacena los detalles del juego en el estado
      } catch (err) {
        setError("Error fetching game details"); // Maneja errores
      } finally {
        setLoading(false); // Cambia el estado de carga a false
      }
    };

    loadGameDetails(); // Llama a la función para cargar los detalles del juego
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>; // Muestra un mensaje de carga
  if (error) return <div className="text-danger">{error}</div>; // Muestra un mensaje de error

  return (
    <div className="container mt-4">
      <h1>{game.name}</h1> {/* Muestra el nombre del juego */}
      <img src={game.background_image} className="img-fluid" alt={game.name} /> {/* Muestra la imagen de fondo */}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(game.description) }} /> {/* Renderiza la descripción como HTML, sanitizada */}
      <p>Rating: {game.rating}</p> {/* Muestra la calificación */}
      <p>Released: {game.released}</p> {/* Muestra la fecha de lanzamiento */}
      <p>Metacritic: {game.metacritic}</p> {/* Muestra la calificación de Metacritic */}
    </div>
  );
};

export default GameDetails;