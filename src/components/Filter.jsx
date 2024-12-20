import { useState } from "react";

const Filter = ({
  onPriceFilter,
  onMetacriticFilter,
  onRatingsFilter,
  onReleaseDateFilter,
}) => {
  const [price, setPrice] = useState(200);
  const [metacriticOrder, setMetacriticOrder] = useState("");
  const [ratingsOrder, setRatingsOrder] = useState("");
  const [releaseDateFilter, setReleaseDateFilter] = useState("");

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value); //PONGO PARSEFLOAT PORQUE SI NO CONFUNDE LOS PRECIOS (NO ENTIENDE LOS DECIMALES)
    setPrice(newPrice);
    onPriceFilter(newPrice);
  };

  const handleMetacriticChange = (e) => {
    const order = e.target.value;
    setMetacriticOrder(order);
    onMetacriticFilter(order);
  };

  const handleRatingsChange = (e) => {
    const order = e.target.value;
    setRatingsOrder(order);
    onRatingsFilter(order);
  };

  const handleReleaseDateChange = (e) => {
    const value = e.target.value;
    setReleaseDateFilter(value);
    onReleaseDateFilter(value);
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
            max="200"
            value={price}
            onChange={handlePriceChange}
          />
          <div>Price: 0$ to ${price}</div>
        </div>
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