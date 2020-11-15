// const app = require('express').Router;
const Atendimentos = require('../models/atendimentos');

module.exports = app => {
  app.get('/atendimentos', (req,res) => {
    Atendimentos.lista()
      .then(resultados => res.status(200).send(resultados))
      .catch ((err) => res.status(404).send(err.message))
  })

  app.get('/atendimentos/:id', (req,res) => {
    try {
      const { id } = req.params;
      Atendimentos.buscaPorId(id, res);
    } catch (error) {
      res.status(404).send(error.message);
    }
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
    try {
      const { id } = req.params;
      const valores = req.body;
      Atendimentos.altera(id, valores, res);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  app.delete('/atendimentos/:id', (req,res) => {
    try {
      const { id } = req.params;
      Atendimentos.deleta(id, res);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
};