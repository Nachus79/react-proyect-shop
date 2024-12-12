import React, { useState } from "react";
import Filter from "./Filter";

const Navbar = ({ onFilterChange, onSearch, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleHomeClick = () => {
    setSearchTerm("");
    onFilterChange("all");
    onSortChange("all");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Player & Vicious
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex ms-auto">
            <button
              className="btn btn-outline-primary me-2"
              onClick={handleHomeClick}
            >
              Home
            </button>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Filter
              onFilterChange={onFilterChange}
              onSortChange={onSortChange}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
