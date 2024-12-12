const Filter = ({ onFilterChange }) => {
    return (
        <div className="filter">
            <label>
                Filter for:
                <select onChange={e => onFilterChange(e.target.value)}>
                    <option value="all">All</option>
                    <option value="new">New</option>
                </select>
            </label>
        </div>
    );
};

export default Filter;