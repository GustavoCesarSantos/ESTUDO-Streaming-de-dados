const { text } = require("express");

class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criarAtendimentos();
  }

  criarAtendimentos() {
    const sqlQuery = 'CREATE TABLE  IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
    this.conexao.query(sqlQuery, (err) => {
      if(err)
        return console.error(err);

      console.info('Tabela atendimentos criada.')
    })
  }
}

module.exports = new Tabelas;