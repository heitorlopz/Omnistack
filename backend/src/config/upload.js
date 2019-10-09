//essa pasta config foi criada para gerenciarmos a biblioteca multer que é uma biblioteca que faz com que consigamos trabalhar com o formato Multipart (Insomnia) -> não pode ser JSON porque no model Spot trabalhamos com imagem e JSON não dá suporte à imagem

const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        //estamos utilizando o path.resolve porque dependendo do sistema operacional, ele nao vai entender as barras (/) pois a configuração das mesmas são diferentes de so para so, então o path.resolve abstrai isso, separando o caminho por virgulas e tratando as barras individualmente e por baixo dos panos, sem precisar preocupar o usuário quanto a isso
        //__dirname significa o diretorio atual, é uma variavel global
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        //callback (cb) é uma função que deve ser chamada assim que o arquivo estiver pronto
        filename: (req, file, cb) => {
            //parametros: null -> caso retorne um erro; file.filename -> nome do arquivo como esta gravado; date.now -> hora que foi salvo para cada arquivo ser unico e n ter o mesmo nome; path.extname -> extensao do arquivo
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            cb(null, `${name}-${Date.now()}${ext}`)
        }
    })

};