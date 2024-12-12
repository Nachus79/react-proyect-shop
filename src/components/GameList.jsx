import GameCard from "./GameCard";

const GameList = ({ games }) => {
  return (
    <div className="container"> 
      <div className="row"> 
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
