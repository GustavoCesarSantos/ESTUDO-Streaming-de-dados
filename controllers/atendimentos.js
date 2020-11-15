// const app = require('express').Router;
const Atendimentos = require('../models/atendimentos');

module.exports = app => {
  app.get('/atendimentos', (req,res) => {
    Atendimentos.lista()
      .then(resultados => res.status(200).send(resultados))
      .catch ((err) => res.status(404).send(err.message))
  })

  app.get('/atendimentos/:id', (req,res) => {
    const { id } = req.params;
    Atendimentos.buscaPorId(id)
      .then((atendimento) => res.status(200).send(atendimento))
      .catch ((err) => res.status(404).send(err.message))
  })

  app.post('/atendimentos', (req,res) => {
    const atendimentos = req.body
    Atendimentos.adiciona(atendimentos)
      .then(atendimentoCadastrado => {
        res.status(201).send(atendimentoCadastrado);
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })

  app.patch('/atendimentos/:id', (req,res) => {
    const { id } = req.params;
    const valores = req.body;
    Atendimentos.altera(id, valores)
      .then(atendimento => res.status(204).end())
      .catch (err => res.status(400).send(err.message))
  })

  app.delete('/atendimentos/:id', (req,res) => {
    const { id } = req.params;
    Atendimentos.deleta(id)
      .then(result => res.status(204).end())
      .catch ( err => res.status(400).send(err.message))
  })
};