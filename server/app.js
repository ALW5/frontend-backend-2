const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');

// Подключаем Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Наши игры
let games = [
    { id: 1, name: "Cyberpunk 2077", price: 3999, category: "RPG", description: "Откройте для себя мир будущего", stock: 10 },
    { id: 2, name: "The Witcher 3", price: 1999, category: "RPG", description: "Станьте охотником на чудовищ", stock: 15 },
    { id: 3, name: "Red Dead Redemption 2", price: 3499, category: "Adventure", description: "Эпическое приключение на Диком Западе", stock: 8 },
    { id: 4, name: "GTA VI", price: 7999, category: "Action", description: "Долгожданное продолжение легендарной серии", stock: 5 },
    { id: 5, name: "Hollow Knight", price: 699, category: "Indie", description: "Загадочное приключение в подземном мире", stock: 20 },
    { id: 6, name: "Spider-Man 2", price: 4999, category: "Action", description: "Новое приключение Человека-паука", stock: 7 }
];

// ========== НАСТРОЙКА SWAGGER ==========
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GameStore API',
            version: '1.0.0',
            description: 'API для управления магазином видеоигр',
            contact: {
                name: 'GameStore',
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
    apis: ['./app.js'], // путь к файлам с аннотациями
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Подключаем Swagger UI по адресу /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ========== ОПИСАНИЕ СХЕМЫ ИГРЫ ==========
/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: Автоматически генерируемый ID игры
 *         name:
 *           type: string
 *           description: Название игры
 *         price:
 *           type: number
 *           description: Цена игры в рублях
 *         category:
 *           type: string
 *           description: Категория игры (RPG, Action и т.д.)
 *         description:
 *           type: string
 *           description: Описание игры
 *         stock:
 *           type: integer
 *           description: Количество на складе
 *       example:
 *         id: 1
 *         name: "Cyberpunk 2077"
 *         price: 3999
 *         category: "RPG"
 *         description: "Откройте для себя мир будущего"
 *         stock: 10
 */

// ========== МАРШРУТЫ С ДОКУМЕНТАЦИЕЙ ==========

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Получить список всех игр
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Список всех игр
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
app.get('/games', (req, res) => {
    res.json(games);
});

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Получить игру по ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID игры
 *     responses:
 *       200:
 *         description: Информация об игре
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Игра не найдена
 */
app.get('/games/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const game = games.find(g => g.id === id);
    
    if (!game) {
        return res.status(404).json({ error: "Игра не найдена" });
    }
    
    res.json(game);
});

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Добавить новую игру
 *     tags: [Games]
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
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Игра успешно добавлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Ошибка в запросе
 */
app.post('/games', (req, res) => {
    console.log("Получен POST запрос");
    console.log("Тело запроса:", req.body);
    
    const { name, price, category, description, stock } = req.body;
    
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Тело запроса пустое" });
    }
    
    if (!name) {
        return res.status(400).json({ error: "Поле 'name' обязательно" });
    }
    
    if (!price) {
        return res.status(400).json({ error: "Поле 'price' обязательно" });
    }
    
    const newGame = {
        id: games.length + 1,
        name: name,
        price: Number(price),
        category: category || "Другое",
        description: description || "",
        stock: stock !== undefined ? Number(stock) : 0
    };
    
    games.push(newGame);
    console.log("Игра добавлена:", newGame);
    res.status(201).json(newGame);
});

/**
 * @swagger
 * /games/{id}:
 *   patch:
 *     summary: Обновить информацию об игре
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID игры
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
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Игра обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Игра не найдена
 */
app.patch('/games/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const game = games.find(g => g.id === id);
    
    if (!game) {
        return res.status(404).json({ error: "Игра не найдена" });
    }
    
    const { name, price, category, description, stock } = req.body;
    
    if (name) game.name = name;
    if (price) game.price = Number(price);
    if (category) game.category = category;
    if (description) game.description = description;
    if (stock !== undefined) game.stock = Number(stock);
    
    res.json(game);
});

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Удалить игру
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID игры
 *     responses:
 *       204:
 *         description: Игра успешно удалена (нет тела ответа)
 *       404:
 *         description: Игра не найдена
 */
app.delete('/games/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const gameIndex = games.findIndex(g => g.id === id);
    
    if (gameIndex === -1) {
        return res.status(404).json({ error: "Игра не найдена" });
    }
    
    games.splice(gameIndex, 1);
    res.status(204).send();
});

// Запуск сервера
app.listen(port, () => {
    console.log(`🕹️ Сервер игрового магазина запущен на http://localhost:${port}`);
    console.log(`📚 Документация Swagger доступна на http://localhost:${port}/api-docs`);
    console.log(`📦 Доступные маршруты:`);
    console.log(`   GET    /games         - список всех игр`);
    console.log(`   GET    /games/:id     - игра по ID`);
    console.log(`   POST   /games         - добавить игру`);
    console.log(`   PATCH  /games/:id     - обновить игру`);
    console.log(`   DELETE /games/:id     - удалить игру`);
});