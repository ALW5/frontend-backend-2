import React from 'react';
import './GameCard.css';

const GameCard = ({ game, onDelete }) => {
  return (
    <div className={`game-card ${game.stock === 0 ? 'out-of-stock' : ''}`}>
      <div className="game-card__media">
        <img 
          src={`https://via.placeholder.com/300x200/${getColorByCategory(game.category)}/ffffff?text=${game.name}`} 
          alt={game.name}
          className="game-card__image"
        />
        {game.stock < 5 && game.stock > 0 && (
          <span className="game-card__badge game-card__badge--warning">Мало</span>
        )}
        {game.stock === 0 && (
          <span className="game-card__badge game-card__badge--danger">Нет в наличии</span>
        )}
      </div>
      
      <div className="game-card__content">
        <h3 className="game-card__title">{game.name}</h3>
        <div className="game-card__meta">
          <span className="game-card__category">{game.category || 'Другое'}</span>
        </div>
        <p className="game-card__description">{game.description}</p>
        
        <div className="game-card__footer">
          <div>
            <span className="game-card__price">{game.price.toLocaleString()} ₽</span>
            <span className="game-card__stock">В наличии: {game.stock}</span>
          </div>
          <button 
            className="game-card__delete-btn"
            onClick={() => onDelete(game.id)}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// Функция для получения цвета по категории
const getColorByCategory = (category) => {
  const colors = {
    'RPG': '9b59b6',
    'Action': 'e74c3c',
    'Adventure': '3498db',
    'Indie': 'f39c12',
    'Strategy': '2ecc71',
    'Sport': 'e67e22'
  };
  return colors[category] || '95a5a6';
};

export default GameCard;