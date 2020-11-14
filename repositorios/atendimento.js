const query = require('../infraestrutura/database/queries');

class Atendimento {
  adiciona(atendimento) {
    const sqlQuery = 'INSERT INTO Atendimentos SET ?';
    return query(sqlQuery, atendimento);
  }
}

module.exports = new Atendimento();