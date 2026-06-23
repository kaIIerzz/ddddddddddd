const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para o painel admin buscar os dados
app.get('/api/dados', (req, res) => {
    // Retornando array vazio temporariamente para não dar erro de conexão na tabela
    res.json([]);
});

// Rota para receber os dados do formulário
app.post('/api/salvar', (req, res) => {
    // Redireciona de volta com sucesso
    res.redirect('/?sucesso=true');
});

// ESSENCIAL PARA A VERCEL RECONHECER:
module.exports = app;
