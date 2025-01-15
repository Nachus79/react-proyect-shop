import { useState } from "react";
import Select from "react-select"; //BIBLIOTECA PARA MEJORAR LOS ESTILOS DE LOS SELECT.

//ESTADOS DE LOS FILTROS.
const Filter = ({
  onPriceFilter,
  onMetacriticFilter,
  onRatingsFilter,
  onReleaseDateFilter,
}) => {
  const [price, setPrice] = useState(200);
  const [metacriticOrder, setMetacriticOrder] = useState(null);
  const [ratingsOrder, setRatingsOrder] = useState(null);
  const [releaseDateFilter, setReleaseDateFilter] = useState(null);

  
  const metacriticOptions = [
    { value: "", label: "No filter" },
    { value: "asc", label: "Low to High" },
    { value: "desc", label: "High to Low" },
  ];

  const ratingsOptions = [
    { value: "", label: "No filter" },
    { value: "asc", label: "Low to High" },
    { value: "desc", label: "High to Low" },
  ];

  const releaseDateOptions = [
    { value: "", label: "No filter" },
    { value: "recent", label: "Recent Games" },
    { value: "older", label: "Older Games" },
  ];

 //ESTILOS PARA LOS SELECT (HAY QUE REVISAR LOS COLORES)

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "lightgray", 
      color: "black", 
      borderColor: "lightblue", 
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff", 
      color: "#212529", 
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007bff" 
        : state.isFocused
        ? "#e9ecef" 
        : "#ffffff", 
      color: state.isSelected ? "#ffffff" : "#212529", 
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#212529", 
    }),
  };

  
  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    setPrice(newPrice);
    onPriceFilter(newPrice);
  };

  const handleMetacriticChange = (selectedOption) => {
    setMetacriticOrder(selectedOption);
    onMetacriticFilter(selectedOption?.value || "");
  };

  const handleRatingsChange = (selectedOption) => {
    setRatingsOrder(selectedOption);
    onRatingsFilter(selectedOption?.value || "");
  };

  const handleReleaseDateChange = (selectedOption) => {
    setReleaseDateFilter(selectedOption);
    onReleaseDateFilter(selectedOption?.value || "");
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
          <Select
            value={metacriticOrder}
            onChange={handleMetacriticChange}
            options={metacriticOptions}
            isClearable
            styles={customStyles}
          />
        </div>
        <div>
          <h5>By ratings</h5>
          <Select
            value={ratingsOrder}
            onChange={handleRatingsChange}
            options={ratingsOptions}
            isClearable
            styles={customStyles}
          />
        </div>
        <div>
          <h5>By release date</h5>
          <Select
            value={releaseDateFilter}
            onChange={handleReleaseDateChange}
            options={releaseDateOptions}
            isClearable
            styles={customStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;

