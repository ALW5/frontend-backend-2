const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let furniture = [
    { 
        id: 1, 
        name: "Диван Комфорт", 
        price: 45990, 
        category: "Диваны",
        description: "Мягкий диван с ортопедическим матрасом",
        material: "Ткань, дерево",
        dimensions: "200x90x80 см",
        color: "Бежевый",
        stock: 5,
        imageUrl: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/514/799/346/491/840/100067456008b1.jpg"
    },
    { 
        id: 2, 
        name: "Кровать-лофт Дрим", 
        price: 38990, 
        category: "Кровати",
        description: "Двухъярусная кровать из массива сосны",
        material: "Массив сосны",
        dimensions: "190x90x180 см",
        color: "Натуральное дерево",
        stock: 3,
        imageUrl: "https://www.mebhome.ru/imgup/617821_164865976778805a221a988e79ef3f42d7c5bfd418.jpg"
    },
    { 
        id: 3, 
        name: "Стол письменный Бюро", 
        price: 12990, 
        category: "Столы",
        description: "Просторный стол с ящиками",
        material: "ЛДСП, металл",
        dimensions: "120x60x75 см",
        color: "Белый/Дуб",
        stock: 8,
        imageUrl: "https://static.baza.farpost.ru/v/1737643786439_bulletin"
    },
    { 
        id: 4, 
        name: "Стул офисный Эрго", 
        price: 8990, 
        category: "Стулья",
        description: "Эргономичное кресло с поддержкой спины",
        material: "Экокожа, пластик",
        dimensions: "65x65x110 см",
        color: "Черный",
        stock: 12,
        imageUrl: "https://avatars.mds.yandex.net/i?id=20844dad857084267a03d685a99cfe3677fe733e-5746458-images-thumbs&n=13"
    },
    { 
        id: 5, 
        name: "Шкаф-купе Гармония", 
        price: 35990, 
        category: "Шкафы",
        description: "Вместительный шкаф с зеркальными дверцами",
        material: "ЛДСП, зеркало",
        dimensions: "180x60x220 см",
        color: "Венге/Дуб",
        stock: 4,
        imageUrl: "https://avatars.mds.yandex.net/i?id=e8486236f46d6036e518b8cc5240bb2077d09a9e-12475925-images-thumbs&n=13"
    },
    { 
        id: 6, 
        name: "Тумба прикроватная Ночка", 
        price: 4990, 
        category: "Тумбы",
        description: "Компактная тумбочка с ящиком",
        material: "ЛДСП",
        dimensions: "40x40x50 см",
        color: "Белый",
        stock: 15,
        imageUrl: "https://avatars.mds.yandex.net/i?id=c5308ab551c4db4db16bcd807d8738634b58d20e-5233448-images-thumbs&n=13"
    },
    { 
        id: 7, 
        name: "Кресло-качалка Релакс", 
        price: 15990, 
        category: "Кресла",
        description: "Уютное кресло для отдыха",
        material: "Ротанг, подушка",
        dimensions: "70x85x100 см",
        color: "Натуральный",
        stock: 6,
        imageUrl: "https://avatars.mds.yandex.net/i?id=4ccc4c95164c841366a1af6ab883b5b841c20132-4900962-images-thumbs&n=13"
    },
    { 
        id: 8, 
        name: "Стеллаж Библиотека", 
        price: 18990, 
        category: "Стеллажи",
        description: "Открытый стеллаж для книг",
        material: "Металл, дерево",
        dimensions: "150x30x180 см",
        color: "Черный/Дуб",
        stock: 7,
        imageUrl: "https://avatars.mds.yandex.net/i?id=d50b3347b4326ae8c0c485f1989d925003caee10-4499935-images-thumbs&n=13"
    },
    { 
        id: 9, 
        name: "Обеденный стол Трапеза", 
        price: 21990, 
        category: "Столы",
        description: "Стол для большой семьи",
        material: "Массив дуба",
        dimensions: "160x80x75 см",
        color: "Дуб",
        stock: 5,
        imageUrl: "https://avatars.mds.yandex.net/i?id=103d9a3bfddae5524a014f99b2a7e307452d3597-5427576-images-thumbs&n=13"
    },
    { 
        id: 10, 
        name: "Комод Минималист", 
        price: 14990, 
        category: "Комоды",
        description: "Современный комод с 4 ящиками",
        material: "ЛДСП",
        dimensions: "80x40x90 см",
        color: "Серый",
        stock: 9,
        imageUrl: "https://avatars.mds.yandex.net/i?id=c6dbf7689be9cf104e678ab261f62afdf65298ac-5031050-images-thumbs&n=13"
    }
];

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FurnitureStore API',
            version: '1.0.0',
            description: 'API для управления магазином мебели',
            contact: {
                name: 'FurnitureStore',
                url: 'http://localhost:3000',
            },
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Локальный сервер',
            },
        ],
    },
    apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ========== ОПИСАНИЕ СХЕМЫ МЕБЕЛИ ==========
/**
 * @swagger
 * components:
 *   schemas:
 *     Furniture:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: ID товара
 *         name:
 *           type: string
 *           description: Название товара
 *         price:
 *           type: number
 *           description: Цена в рублях
 *         category:
 *           type: string
 *           description: Категория
 *         description:
 *           type: string
 *           description: Описание
 *         material:
 *           type: string
 *           description: Материал
 *         dimensions:
 *           type: string
 *           description: Габариты
 *         color:
 *           type: string
 *           description: Цвет
 *         stock:
 *           type: integer
 *           description: Количество на складе
 *         imageUrl:
 *           type: string
 *           description: Ссылка на фотографию товара
 *       example:
 *         id: 1
 *         name: "Диван Комфорт"
 *         price: 45990
 *         category: "Диваны"
 *         description: "Мягкий диван с ортопедическим матрасом"
 *         material: "Ткань, дерево"
 *         dimensions: "200x90x80 см"
 *         color: "Бежевый"
 *         stock: 5
 *         imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"
 */

// ========== МАРШРУТЫ ==========

/**
 * @swagger
 * /furniture:
 *   get:
 *     summary: Получить список всей мебели
 *     tags: [Furniture]
 *     responses:
 *       200:
 *         description: Список мебели
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Furniture'
 */
app.get('/furniture', (req, res) => {
    res.json(furniture);
});

/**
 * @swagger
 * /furniture/{id}:
 *   get:
 *     summary: Получить товар по ID
 *     tags: [Furniture]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Информация о товаре
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Furniture'
 *       404:
 *         description: Товар не найден
 */
app.get('/furniture/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = furniture.find(f => f.id === id);
    
    if (!item) {
        return res.status(404).json({ error: "Товар не найден" });
    }
    
    res.json(item);
});

/**
 * @swagger
 * /furniture:
 *   post:
 *     summary: Добавить новый товар
 *     tags: [Furniture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               material:
 *                 type: string
 *               dimensions:
 *                 type: string
 *               color:
 *                 type: string
 *               stock:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Товар успешно добавлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Furniture'
 *       400:
 *         description: Ошибка в запросе
 */
app.post('/furniture', (req, res) => {
    console.log("Получен POST запрос");
    console.log("Тело запроса:", req.body);
    
    const { name, price, category, description, material, dimensions, color, stock, imageUrl } = req.body;
    
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Тело запроса пустое" });
    }
    
    if (!name) {
        return res.status(400).json({ error: "Поле 'name' обязательно" });
    }
    
    if (!price) {
        return res.status(400).json({ error: "Поле 'price' обязательно" });
    }
    
    const newItem = {
        id: furniture.length + 1,
        name: name,
        price: Number(price),
        category: category || "Другое",
        description: description || "",
        material: material || "Не указан",
        dimensions: dimensions || "Не указаны",
        color: color || "Не указан",
        stock: stock !== undefined ? Number(stock) : 0,
        imageUrl: imageUrl || `https://via.placeholder.com/300x200/8B4513/ffffff?text=${name}`
    };
    
    furniture.push(newItem);
    console.log("Товар добавлен:", newItem);
    res.status(201).json(newItem);
});

/**
 * @swagger
 * /furniture/{id}:
 *   patch:
 *     summary: Обновить информацию о товаре
 *     tags: [Furniture]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               material:
 *                 type: string
 *               dimensions:
 *                 type: string
 *               color:
 *                 type: string
 *               stock:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Товар обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Furniture'
 *       404:
 *         description: Товар не найден
 */
app.patch('/furniture/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = furniture.find(f => f.id === id);
    
    if (!item) {
        return res.status(404).json({ error: "Товар не найден" });
    }
    
    const { name, price, category, description, material, dimensions, color, stock, imageUrl } = req.body;
    
    if (name) item.name = name;
    if (price) item.price = Number(price);
    if (category) item.category = category;
    if (description) item.description = description;
    if (material) item.material = material;
    if (dimensions) item.dimensions = dimensions;
    if (color) item.color = color;
    if (stock !== undefined) item.stock = Number(stock);
    if (imageUrl) item.imageUrl = imageUrl;
    
    res.json(item);
});

/**
 * @swagger
 * /furniture/{id}:
 *   delete:
 *     summary: Удалить товар
 *     tags: [Furniture]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID товара
 *     responses:
 *       204:
 *         description: Товар успешно удален
 *       404:
 *         description: Товар не найден
 */
app.delete('/furniture/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = furniture.findIndex(f => f.id === id);
    
    if (itemIndex === -1) {
        return res.status(404).json({ error: "Товар не найден" });
    }
    
    furniture.splice(itemIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`🛋️ Сервер мебельного магазина запущен на http://localhost:${port}`);
    console.log(`📚 Документация Swagger: http://localhost:${port}/api-docs`);
    console.log(`📦 Доступные маршруты:`);
    console.log(`   GET    /furniture         - список всей мебели`);
    console.log(`   GET    /furniture/:id     - товар по ID`);
    console.log(`   POST   /furniture         - добавить товар`);
    console.log(`   PATCH  /furniture/:id     - обновить товар`);
    console.log(`   DELETE /furniture/:id     - удалить товар`);
});