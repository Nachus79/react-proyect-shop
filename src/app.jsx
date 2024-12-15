import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import SearchResults from "./pages/SearchResults";
import GameList from "./components/GameList"; 
import GameDetails from "./components/GameDetails";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/games" element={<GameList />} /> 
          <Route path="/games/:id" element={<GameDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;