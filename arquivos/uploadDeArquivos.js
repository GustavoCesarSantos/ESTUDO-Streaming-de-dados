const fs = require('fs');

fs.readFile('./assets/download.jpg', (err, buffer) => {
  console.log(buffer);

  fs.writeFile('./assets/teste.jpg', buffer, (err) => {
    console.log('Imagem escrita com sucesso. - Buffer');
  })
})

fs.createReadStream('./assets/download.jpg')
  .pipe(fs.createWriteStream('./assets/testeStream.jpg'))
  .on('finish', () => console.log('Imagem escrita com sucesso. - Stream'))