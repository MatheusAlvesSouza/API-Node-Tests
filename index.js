const app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const alunos = [];

const addAluno = function(nome, sala) {
    alunos.push({
        nome: nome,
        sala: sala
    });

    return {
        nome: nome,
        sala: sala
    };
}

const getAlunos = function() {
    return alunos;
};

app.get('/aluno', function (req, res) {
    res.status(200)
        .json(getAlunos());
});

app.post('/aluno', function (req, res) {
    res.status(201)
        .json(addAluno(req.body.nome, req.body.sala));
});

app.listen(3000, function(){
    console.log("Servidor rodando na porta 3000...\n");
});

module.exports = { app, addAluno, getAlunos }