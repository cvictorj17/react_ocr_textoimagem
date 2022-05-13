const tesseract = require("node-tesseract-ocr");

const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
}

tesseract
    .recognize("imagem_extrair_texto.jpg", config)
    .then((text) => {
        console.log("Resultado: ", text);
    })
    .catch((error) => {
        console.log(error.message);
    });