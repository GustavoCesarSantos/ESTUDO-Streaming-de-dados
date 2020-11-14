const Axios = require('axios');
const moment = require('moment');

const atendimentos = require('../controllers/atendimentos');
const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimento');

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
      return new Promise((resolve, reject) => reject(erros[0].mensagem))

    const atendimentoDatado = { ...atendimento, dataCriacao, data };
    return repositorio.adiciona(atendimentoDatado)
      .then(result => {
        const id = result.insertId;
        return ({ ...atendimento, id});
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

    conexao.query(sqlQuery, async (err, result) => {
      const atendimento = result[0];
      const cpf = atendimento.cliente;

      if(err)
        throw new Error(err.message);

      const { data } = await Axios.get(`http://localhost:8082/${cpf}`);
      atendimento.cliente = data;
      res.status(200).send(atendimento);
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