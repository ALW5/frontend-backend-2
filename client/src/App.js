import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FurnitureCard from './components/FurnitureCard';
import './App.css';

function App() {
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    material: '',
    dimensions: '',
    color: '',
    stock: ''
  });

  useEffect(() => {
    fetchFurniture();
  }, []);

  const fetchFurniture = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/furniture');
      setFurniture(response.data);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки товаров');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/furniture', {
        name: newItem.name,
        price: Number(newItem.price),
        category: newItem.category,
        description: newItem.description,
        material: newItem.material,
        dimensions: newItem.dimensions,
        color: newItem.color,
        stock: Number(newItem.stock)
      });
      setFurniture(prev => [...prev, response.data]);
      setNewItem({
        name: '',
        price: '',
        category: '',
        description: '',
        material: '',
        dimensions: '',
        color: '',
        stock: ''
      });
    } catch (err) {
      alert('Ошибка при добавлении товара');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить товар?')) return;
    
    try {
      await axios.delete(`http://localhost:3000/furniture/${id}`);
      setFurniture(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      alert('Ошибка при удалении');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛋️ FurnitureStore</h1>
        <p>Мебель для уютного дома</p>
      </header>

      <main>
        <section className="add-item-section">
          <h2>Добавить новый товар</h2>
          <form onSubmit={handleSubmit} className="add-item-form">
            <input
              type="text"
              name="name"
              placeholder="Название"
              value={newItem.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Цена"
              value={newItem.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Категория"
              value={newItem.category}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="material"
              placeholder="Материал"
              value={newItem.material}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="dimensions"
              placeholder="Размеры (см)"
              value={newItem.dimensions}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="color"
              placeholder="Цвет"
              value={newItem.color}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Описание"
              value={newItem.description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="stock"
              placeholder="Количество"
              value={newItem.stock}
              onChange={handleInputChange}
            />
            <button type="submit">➕ Добавить товар</button>
          </form>
        </section>

        <section className="items-section">
          <h2>Наш каталог</h2>
          
          {loading && <div className="loading">Загрузка...</div>}
          {error && <div className="error">{error}</div>}
          
          <div className="items-grid">
            {furniture.map(item => (
              <FurnitureCard 
                key={item.id} 
                item={item} 
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