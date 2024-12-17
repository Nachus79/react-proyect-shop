import React, { useState } from "react";

const Filter = ({
  onPriceFilter,
  onMetacriticFilter,
  onRatingsFilter,
  onReleaseDateFilter,
}) => {
  const [price, setPrice] = useState(10);
  const [metacriticOrder, setMetacriticOrder] = useState("asc");
  const [ratingsOrder, setRatingsOrder] = useState("asc");
  const [releaseDateFilter, setReleaseDateFilter] = useState("");

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value); //AÑADO "PARSEFLOAT PARA ASEGURARME DE QUE EL PROGRAMA INTERPRETA BIEN LOS DECIMALES"
    setPrice(newPrice);
    onPriceFilter(newPrice); //FILTRO PARA EL PRECIO
  };

  const handleMetacriticChange = (e) => {
    const metacriticOrder = e.target.value;
    setMetacriticOrder(metacriticOrder);
    onMetacriticFilter(metacriticOrder); //FILTRO PARA METACRITIC
  };

  const handleRatingsChange = (e) => {
    const ratingsOrder = e.target.value;
    setRatingsOrder(ratingsOrder);
    onRatingsFilter(ratingsOrder); //FILTRO PARA LAS PUNTUACIONES
  };

  const handleReleaseDateChange = (e) => {
    const value = e.target.value;
    setReleaseDateFilter(value);
    onReleaseDateFilter(value); //FILTRO PARA LA FECHA DE LANZAMIENTO
  };

  return (
    <div className="mb-4">
      <h3>Filter:</h3>
      <div className="d-flex flex-row justify-content-between">
        <div>
          <h5>By price</h5>
          <input
            type="range"
            min="10"
            max="100"
            value={price}
            onChange={handlePriceChange}
          />
          <div>Price: 0$ to ${price}</div>
        </div>
        {/*DEPLEGABLES (SE PISAN UNOS A OTROS)*/}
        <div>
          <h5>By Metacritic</h5>
          <select value={metacriticOrder} onChange={handleMetacriticChange}>
            <option value="">No filter</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div>
          <h5>By ratings</h5>
          <select value={ratingsOrder} onChange={handleRatingsChange}>
            <option value="">No filter</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div>
          <h5>By release date</h5>
          <select value={releaseDateFilter} onChange={handleReleaseDateChange}>
            <option value="">No filter</option>
            <option value="recent">Recent Games</option>
            <option value="older">Older Games</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
