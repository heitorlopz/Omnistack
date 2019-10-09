//express é biblioteca para acelerar a construção do app
//express -> microframework (conjunto de funcionalidades prontas), vai ajudar nas rotas, requisiçoes, etc
//tivemos que add a dependencia cors para prevenir o erro que daria quando rodasse o frontend do app. esse erro se dá porque a api pode ser consumida por usuários não desejados, então usamos o cors para autorizar o endereço que irá consumir a api que a gente configurou
const express = require('express'); //require importa a dependência escolhida para o projeto
const mongoose = require('mongoose');
const cors  = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://heitorlopz:omnistack@omnistack-mtxup.mongodb.net/semanaOmnistack?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//caso deixamos o use(cors()) sem parametros, qualquer aplicação pode acessar a nossa api <-> caso quisessemos que apenas a gente acessasse, seria app.use(cors({'http://localhost:3000'})) 
app.use(cors());
app.use(express.json());
//precisa colocar o express.json antes, pois ele le sequencialmente, só vai entender as coisas json do que vier após ele
//express.static é uma forma do express retornar arquivos estáticos, como pdf, imagens, geralmente utilizado quando tem upload no app
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333); //a porta que eu quero executar meu app