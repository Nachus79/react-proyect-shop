import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://gaming-news2.p.rapidapi.com/news", {
          params: {
            locale: "it_IT",
            country: "it",
            language: "it",
            timezone: "+01:00", //REVISAR 
          },
          headers: {
            "x-rapidapi-host": "gaming-news2.p.rapidapi.com",
            "x-rapidapi-key": "8d0b52c9b0msh4c6a2abb27d9f3dp1bdb92jsn56a74ddc57f1",
          },
        });
        setNews(response.data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Could not fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>News</h1>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h2>{article.title || "Untitled"}</h2>
            <p>{article.description || "No description available."}</p>
            {article.link && (
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPage;


