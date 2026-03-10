require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const auth = require('./middlewares/auth');
const vendasRoutes = require('./routes/vendas');

app.use('/vendas', auth, vendasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
