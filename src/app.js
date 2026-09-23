const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./middlewares/rateLimiter');

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use('/api/', rateLimiter);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.get('/', (req, res) => res.status(200).send('API enStock funcionando'));

module.exports = app;