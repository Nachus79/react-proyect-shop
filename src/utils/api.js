import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchGames = async (page = 1, pageSize = 40) => {
  const response = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`
  );
  return response.data.results;
};

export const fetchGameDetails = async (id) => {
  const response = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  );
  return response.data;
};

export const fetchGenres = async () => {
  const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  return response.data.results;
};

console.log(import.meta.env.VITE_API_KEY);