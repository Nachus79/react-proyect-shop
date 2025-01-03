import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import SearchResults from "./pages/SearchResults";
import GameList from "./components/GameList"; 
import GameDetails from "./components/GameDetails";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="bg-custom">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/games" element={<GameList />} /> 
          <Route path="/games/:id" element={<GameDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;