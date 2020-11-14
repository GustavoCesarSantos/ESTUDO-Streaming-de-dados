// const app = require('express').Router;
const Atendimentos = require('../models/atendimentos');

module.exports = app => {
  app.get('/atendimentos', (req,res) => {
    try {
      Atendimentos.lista(res);
    } catch (error) {
      res.status(404).send(error.message);
    }
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
    try {
      const atendimentos = req.body
      Atendimentos.adiciona(atendimentos);
      res.status(201).send(atendimentos);
    } catch (error) {
      res.status(400).send(error.message);
    }
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