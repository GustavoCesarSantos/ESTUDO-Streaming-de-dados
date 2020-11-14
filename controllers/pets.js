const Pet = require('../models/pets');

module.exports = app => {
  app.post('/pet', (req, res) => {
    try {
      const pet = req.body;
      Pet.adiciona(pet, res);
    } catch (err) {
      res.status(406).send(err.message)
    }
  })
}