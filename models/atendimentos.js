const moment = require('moment');
const atendimentos = require('../controllers/atendimentos');

const conexao = require('../infraestrutura/conexao');

class Atendimentos {
  adiciona(atendimento) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: 'data',
        valido: dataEhValida,
        mensagem: 'Data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        valido: clienteEhValido,
        mensagem: 'Cliente deve ter pelo menos cinco caracteres'
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido);
    const existemErros = erros.length;

    if(existemErros)
      throw new Error(erros[0].mensagem);

    const atendimentoDatado = { ...atendimento, dataCriacao, data };
    const sqlQuery = 'INSERT INTO Atendimentos SET ?'
    conexao.query(sqlQuery, atendimentoDatado, (err, result) => {
      if(err)
        throw new Error(err.message);

      console.info(result);
    })
  }

  lista(res) {
    const sqlQuery = 'SELECT * FROM Atendimentos';

    conexao.query(sqlQuery, (err, result) => {
      if(err)
        throw new Error(err.message);

        res.status(200).send(result);
    })
  }

  buscaPorId(id, res) {
    const sqlQuery = `SELECT * FROM Atendimentos WHERE id=${id}`;

    conexao.query(sqlQuery, (err, result) => {
      if(err)
        throw new Error(err.message);

        res.status(200).send(result[0]);
    })
  }

  altera(id, valores, res) {
    if(valores.data)
      valores.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    
    const sqlQuery = `UPDATE Atendimentos SET ? WHERE id=?`;

    conexao.query(sqlQuery, [valores, id], (err) => {
      if(err)
        throw new Error(err.message);

        res.status(204).end();
    })
  }

  deleta(id, res) {
    const sqlQuery = `DELETE FROM Atendimentos WHERE id=?`;

    conexao.query(sqlQuery, id, (err) => {
      if(err)
        throw new Error(err.message);

        res.status(204).end();
    })
  }
}

module.exports = new Atendimentos;