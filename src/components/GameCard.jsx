const GameCard = ({ game }) => {
    const { title, description, price, thumb, dealLink } = game;
  
    return (
      <div className="col-6 col-md-3 mb-4">
        <div className="card h-100 shadow-sm">
          <img src={thumb || '/path/to/default-image.jpg'} className="card-img-top" alt={title || 'No title'} />
          <div className="card-body">
            <h5 className="card-title">{title || 'No title available'}</h5>
            <p className="card-text">{description || 'No description available'}</p>
            <p className="card-price">Price: ${price || 'N/A'}</p>
            <a href={dealLink || '#'} className="btn btn-primary">Ver Oferta</a>
          </div>
        </div>
      </div>
    );
  };
  
  export default GameCard;
  
