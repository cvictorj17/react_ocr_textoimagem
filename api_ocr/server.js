// Importa as dependências do express
import express from 'express';
import bodyParser from 'body-parser';
import upload from './config/storage';
import { extractText } from './lib/imageHandler';

const app = express();
// Adiciona o body-parser ao projeto
app.use(bodyParser.urlencoded({ extended: true }))
// Cria endpoint localhost:3000/upload
app.post('/upload', upload.single('image'), async (req, res, next) => {
  //res.send('OCR - Reconhecimento óptico de caracteres');
  const file = req.file;

  if (!file){
    const error = new Error("Envie o arquivo para ser tratado");
    error.httpStatusCode = 400;
    return res.json(error);
  }

  //res.send(file);
  await extractText(file.path).then(text => {
    const result = { data: text, ...file };
    res.json(result.data);
  }).catch((error) => {
    res.json(error.message);
  });
})
// Inicia o servidor na porta 3000
app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});