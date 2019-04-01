const chai = require('chai');
const http = require('chai-http'); // Extensão da lib chai p/ simular requisições http
const subSet = require('chai-subset'); // Extensao da lib chai p/ verificar objetos

const index = require('../index'); // Arquivo a ser testado

chai.use(http);
chai.use(subSet);

// O atributo do objeto será testado para verificar se ele existe
// O atributo recebe uma função, e ela deve retornar true para o teste passar
const alunoSchema = {
    nome: nome => nome,
    sala: sala => sala
};

describe('Teste das funcoes', () => {

    it('addAluno', () => {
        const aluno = index.addAluno('matheus', 'sala 1');

        // Verifica se as caracteristicas do objeto aluno é igual ao alunoSchema
        chai.expect(aluno).to.containSubset(alunoSchema);
    });

    it('getAlunos', () => {

        index.addAluno('osmar', 'sala 1');
        index.addAluno('mariana', 'sala 2');
        const alunos = index.getAlunos();
        
        chai.expect(alunos.length).to.be.equals(3);
        // Primeiro se verifica se está retornando um array
        // Verifica se as caracteristicas dos objetos no array é igual ao alunoSchema
        chai.expect(alunos).to.containSubset([alunoSchema]);
    });
});

describe('Testes de integração', () => {

    it('/aluno - POST', () => {
        chai.request(index.app)
            .post('/aluno')
            .send({
                nome: 'ivete',
                sala: 'sala 2'
            })
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201); 
                chai.expect(res.body).to.containSubset(alunoSchema);
            });
    });

    it('/aluno - GET', () => {
        chai.request(index.app)
            .get('/aluno')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200); 
                chai.expect(res.body.length).to.be.equal(4);
                chai.expect(res.body).to.containSubset([alunoSchema]);
            });
    });
});