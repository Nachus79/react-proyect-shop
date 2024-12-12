const GameCard = ({ game }) => {
  return (
    <div className="col-6 col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={game.thumb} className="card-img-top" alt={game.title} />
        <div className="card-body">
          <h5 className="card-title">{game.title}</h5>
          <p className="card-text">{game.description}</p>
          <p className="card -price">Price: ${game.price}</p>
          <a href={game.dealLink} className="btn btn-primary">
            Ver Oferta
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
