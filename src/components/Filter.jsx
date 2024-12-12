const Filter = ({ onFilterChange, onSortChange }) => {
  return (
    <div className="filter">
      <label>
        Filter and Sort:
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value === "dealRating" || value === "salePrice") {
              onSortChange(value);
            } else {
              onFilterChange(value);
            }
          }}
        >
          <option value="all">All</option>
          <option value="dealRating">Ratings</option>
          <option value="salePrice">Lower prices</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
