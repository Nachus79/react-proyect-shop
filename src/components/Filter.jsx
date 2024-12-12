const Filter = ({ onFilterChange, onSortChange }) => {
  return (
    <div className="filter">
      <label>
        Filter and Sort:
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (
              value === "dealRating" ||
              value === "salePrice" ||
              value === "normalPrice" ||
              value === "internalName"
            ) {
              onSortChange(value);
            } else {
              onFilterChange(value);
            }
          }}
        >
          <option value="all">All</option>
          <option value="internalName">Name (A-Z)</option>
          <option value="dealRating">Most rated</option>
          <option value="salePrice">Lower prices</option>
          <option value="normalPrice">Normal prices</option>
        </select>
        ;
      </label>
    </div>
  );
};

export default Filter;
