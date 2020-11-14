const fs = require('fs');

fs.readFile('./assets/download.jpg', (err, buffer) => {
  console.log(buffer);

  fs.writeFile('./assets/teste.jpg', buffer, (err) => {
    console.log('Imagem escrita com sucesso.');
  })
})