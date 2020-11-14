const conexao = require('../infraestrutura/conexao');
const uploadDeArquivos = require('../arquivos/uploadDeArquivos');

class Pet {
  adiciona(pet, res) {
    const sqlQuery = 'INSERT INTO Pets SET ?';

    uploadDeArquivos(pet.imagem, pet.nome, (novoCaminho) => {
      const novoPet = { nome: pet.nome, imagem: novoCaminho }
  
      conexao.query(sqlQuery, novoPet, err => {
        if(err)
          res.status(400).send(err.message);
  
        res.status(201).send(novoPet);
      })
    })
  }
}

module.exports = new Pet();