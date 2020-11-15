const query = require('../infraestrutura/database/queries');

class Atendimento {
  adiciona(atendimento) {
    const sqlQuery = 'INSERT INTO Atendimentos SET ?';
    return query(sqlQuery, atendimento);
  }

  lista() {
    const sqlQuery = 'SELECT * FROM Atendimentos';
    return query(sqlQuery);
  }

  buscaPorId(id) {
    const sqlQuery = `SELECT * FROM Atendimentos WHERE id=${id}`;
    return query(sqlQuery);
  }
}

module.exports = new Atendimento();