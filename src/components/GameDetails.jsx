import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../utils/api";
import DOMPurify from "dompurify";

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
      <h1 className="text-center mb-4">{game.name}</h1>{" "}
      {/* Muestra el nombre del juego */}
      <img
        src={game.background_image}
        className="img-fluid rounded mb-4"
        alt={game.name}
      />{" "}
      {/* Muestra la imagen de fondo */}
      {/* USO UNA TARJETA DE BOOTSTRAP PARA MEJORAR LA PRESENTACIÓN*/}
      <div className="card p-3 shadow-sm">
        <h3 className="card-title">Description</h3>
        <div
          className="card-body text-justify"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(game.description),
          }}
        />
      </div>
      {/* DETALLES DEL JUEGO */}
      <div className="mt-4">
        <p><strong>Rating:</strong> {game.rating}</p>
        <p><strong>Released:</strong> {game.released}</p>
        <p><strong>Metacritic:</strong> {game.metacritic}</p>
      {/*IMAGEN ADICIONAL (LA GALERÍA DE IMÁGENES NO FUNCIONA) */}
        <img
          src={game.background_image_additional}
          className="img-fluid rounded mb-4"
          style={{ width: "50%", height: "auto" }}
          alt="Imágenes del juego"
        />
      </div>
    </div>
  );
};

export default GameDetails;
