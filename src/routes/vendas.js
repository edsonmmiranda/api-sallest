const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /vendas?data_inicial=2024-01-01&data_final=2024-01-31
router.get('/', async (req, res) => {
  const { data_inicial, data_final } = req.query;

  if (!data_inicial || !data_final) {
    return res.status(400).json({ error: 'Parâmetros "data_inicial" e "data_final" são obrigatórios' });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM vendas WHERE fatura_data BETWEEN ? AND ?',
      [data_inicial, `${data_final} 23:59:59`]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
