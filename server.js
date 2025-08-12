const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/jogos', gameRoutes);

const PORT = process.env.APP_PORT || 3012;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));