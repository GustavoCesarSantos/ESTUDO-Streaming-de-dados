const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');

const app = customExpress();
conexao.connect((error) => {
  if(error)
    return console.error(`Erro ao conectar: ${error}.`);

  console.info('Base conectada com sucesso.');
  Tabelas.init(conexao);
});

app.listen(3000, () => { console.log('Servidor rodando na porta 3000') });