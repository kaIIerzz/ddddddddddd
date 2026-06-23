const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const porta = 3000;

// Configurações do Express para ler JSON e arquivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Inicializando o banco de dados SQLite (cria um arquivo database.db)
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error(err.message);
    console.log('Conectado ao banco de dados SQLite.');
});

// Criando a tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dado1 TEXT,
    dado2 TEXT,
    dado3 TEXT,
    cpf TEXT,
    nome TEXT
)`);

// Rota para receber os dados do formulário e salvar no banco
app.post('/salvar', (req, res) => {
    const { dado1, dado2, dado3, cpf, nome } = req.body;
    const query = `INSERT INTO registros (dado1, dado2, dado3, cpf, nome) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(query, [dado1, dado2, dado3, cpf, nome], function(err) {
        if (err) {
            return res.status(500).send("Erro ao salvar no banco de dados.");
        }
        res.redirect('/?sucesso=true');
    });
});

// Rota para o painel admin buscar os dados
app.get('/api/dados', (req, res) => {
    db.all(`SELECT * FROM registros ORDER BY id DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(rows);
    });
});

app.listen(porta, () => {
    console.log(`Servidor rodando em: http://localhost:${porta}`);
});
