const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./middlewares/rateLimiter');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares globales
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting en la ruta base /api/
app.use('/api/', rateLimiter);

// Rutas
app.use('/api/v1/auth', authRoutes);

module.exports = app;