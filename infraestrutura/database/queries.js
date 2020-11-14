const conexao = require('./conexao');

const executaQuery = (query, parametros = '') => {
  return new Promise((resolve, reject) => {
    conexao.query(query, parametros, (err, resul, campos) => {
      if(err)
        reject(err)

      resolve(resul);
    })
  })
}

module.exports = executaQuery;