import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from './components/GameCard';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newGame, setNewGame] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: ''
  });

  // Загружаем игры с сервера при запуске
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/games');
      setGames(response.data);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки игр');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGame(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/games', {
        name: newGame.name,
        price: Number(newGame.price),
        category: newGame.category,
        description: newGame.description,
        stock: Number(newGame.stock)
      });
      setGames(prev => [...prev, response.data]);
      // Очищаем форму
      setNewGame({
        name: '',
        price: '',
        category: '',
        description: '',
        stock: ''
      });
    } catch (err) {
      alert('Ошибка при добавлении игры');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить игру?')) return;
    
    try {
      await axios.delete(`http://localhost:3000/games/${id}`);
      setGames(prev => prev.filter(game => game.id !== id));
    } catch (err) {
      alert('Ошибка при удалении');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎮 GameStore</h1>
        <p>Магазин видеоигр</p>
      </header>

      <main>
        {/* Форма добавления игры */}
        <section className="add-game-section">
          <h2>Добавить новую игру</h2>
          <form onSubmit={handleSubmit} className="add-game-form">
            <input
              type="text"
              name="name"
              placeholder="Название игры"
              value={newGame.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Цена"
              value={newGame.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Категория"
              value={newGame.category}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Описание"
              value={newGame.description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="stock"
              placeholder="Количество на складе"
              value={newGame.stock}
              onChange={handleInputChange}
            />
            <button type="submit">Добавить игру</button>
          </form>
        </section>

        {/* Список игр */}
        <section className="games-section">
          <h2>Наши игры</h2>
          
          {loading && <div className="loading">Загрузка...</div>}
          {error && <div className="error">{error}</div>}
          
          <div className="games-grid">
            {games.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
