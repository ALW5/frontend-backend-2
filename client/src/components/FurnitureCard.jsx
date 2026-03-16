import React from 'react';
import './FurnitureCard.css';

const FurnitureCard = ({ item, onDelete }) => {
  return (
    <div className={`furniture-card ${item.stock === 0 ? 'out-of-stock' : ''}`}>
      <div className="furniture-card__media">
        <img 
          src={item.imageUrl || `https://via.placeholder.com/300x200/${getColorByCategory(item.category)}/ffffff?text=${item.name}`} 
          alt={item.name}
          className="furniture-card__image"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x200/${getColorByCategory(item.category)}/ffffff?text=${item.name}`;
          }}
        />
        {item.stock < 3 && item.stock > 0 && (
          <span className="furniture-card__badge furniture-card__badge--warning">Осталось мало</span>
        )}
        {item.stock === 0 && (
          <span className="furniture-card__badge furniture-card__badge--danger">Нет в наличии</span>
        )}
      </div>
      
      <div className="furniture-card__content">
        <h3 className="furniture-card__title">{item.name}</h3>
        <div className="furniture-card__meta">
          <span className="furniture-card__category">{item.category || 'Другое'}</span>
        </div>
        
        <div className="furniture-card__details">
          <p className="furniture-card__description">{item.description}</p>
          <div className="furniture-card__specs">
            {item.material && <span>🪵 {item.material}</span>}
            {item.dimensions && <span>📏 {item.dimensions}</span>}
            {item.color && <span>🎨 {item.color}</span>}
          </div>
        </div>
        
        <div className="furniture-card__footer">
          <div className="furniture-card__price-info">
            <span className="furniture-card__price">{item.price.toLocaleString()} ₽</span>
            <span className="furniture-card__stock">В наличии: {item.stock}</span>
          </div>
          <button 
            className="furniture-card__delete-btn"
            onClick={() => onDelete(item.id)}
            title="Удалить товар"
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
    'Диваны': '8B4513',      // коричневый
    'Кровати': '2F4F4F',     // темный сланец
    'Столы': 'A0522D',       // сиена
    'Стулья': 'D2691E',      // шоколадный
    'Шкафы': '8B5A2B',       // коричневый
    'Кресла': 'B8860B',      // темное золото
    'Тумбы': 'CD853F',       // перу
    'Стеллажи': '9ACD32',    // желто-зеленый
    'Комоды': 'BDB76B'       // темный хаки
  };
  return colors[category] || 'A9A9A9'; // серый по умолчанию
};

export default FurnitureCard;