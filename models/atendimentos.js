const Axios = require('axios');
const moment = require('moment');

const atendimentos = require('../controllers/atendimentos');
const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimento');

class Atendimentos {
  constructor() {
    this.dataEhValida = ({ data, dataCriacao })=> moment(data).isSameOrAfter(dataCriacao);
    this.clienteEhValido = (tamanho) => tamanho >= 5;
    this.valida = (parametros) => {
      this.validacoes.filter( (campo) => {
        const { nome } = campo;
        const parametro = parametros[nome];

        return !campo.valido(parametro)
      })
    }

    this.validacoes = [
      {
        nome: 'data',
        valido: this.dataEhValida,
        mensagem: 'Data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        valido: this.clienteEhValido,
        mensagem: 'Cliente deve ter pelo menos cinco caracteres'
      }
    ]
  }

  adiciona(atendimento) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const parametros = {
      data: { data, dataCriacao },
      cliente: { tamanho: atendimento.cliente.length }
    }
    const erros = this.valida(parametros)
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

  lista() {
    return repositorio.lista()
  }

  buscaPorId(id) {
    return repositorio.buscaPorId(id)
      .then(result => {
        const atendimento = result[0];
        const cpf = atendimento.cliente;

        return new Promise((resolve, reject) => {
          resolve(Axios.get(`http://localhost:8082/${cpf}`))
        })
        .then(data =>  {
          atendimento.client = data;
          return atendimento;
        })
      })
  }

  altera(id, valores) {
    if(valores.data)
      valores.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    
    return repositorio.altera(id, valores)
  }

  deleta(id) {
    return repositorio.deleta(id)
  }
}

module.exports = new Atendimentos;