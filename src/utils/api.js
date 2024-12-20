import axios from "axios";
/*
const API_KEY = import.meta.env.VITE_API_KEY || "http://localhost:8000";
*/
const API_KEY = "08ce5badfd794c18bd5b24fe9c325fcf";

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

