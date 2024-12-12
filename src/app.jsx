import { useEffect, useState } from 'react';
import GameList from './components/GameList';
import Navbar from './components/Navbar';
import axios from 'axios';

const App = () => {
    const [games, setGames] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15');
                const gamesData = response.data.map(deal => ({
                    id: deal.dealID,
                    title: deal.title,
                    description: `Precio normal: $${deal.normalPrice}`,
                    price: deal.salePrice,
                    isNew: deal.releaseDate > Date.now() / 1000 - 60 * 60 * 24 * 30,
                    thumb: deal.thumb,
                    dealLink: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`
                }));
                setGames(gamesData);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };
        fetchGames();
    }, []);

    const filteredGames = games.filter(game => 
        (filter !== 'new' || game.isNew) && 
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app">
            <Navbar onFilterChange={setFilter} onSearch={setSearchTerm} />
            <div className="container mt-5 pt-5">
                <h1 className="text-center mb-4">Videogames</h1>
                <div className="row">
                    <GameList games={filteredGames} />
                </div>
            </div>
        </div>
    );
};

export default App;