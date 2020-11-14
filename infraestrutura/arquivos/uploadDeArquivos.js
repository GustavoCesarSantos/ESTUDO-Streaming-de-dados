const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
  const tiposValidos = ['jpg', 'png', 'jpeg']
  const tipo = path.extname(caminho);

  if(!tiposValidos.includes(tipo.substring(1)))
    throw new Error('Tipo invalido de arquivo')

  const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`;
  fs.createReadStream(caminho)
    .pipe(fs.createWriteStream(novoCaminho))
    .on('finish', () => callbackImagemCriada(novoCaminho))
}