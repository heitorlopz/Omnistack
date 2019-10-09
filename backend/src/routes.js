//importando o express
const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

//importar meu controller
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');


//pegando o cara responsável pelas rotas do Express e separando ele dentro de uma variável
const routes = express.Router();
const upload = multer(uploadConfig);

//req => requisicao (todas as informaçoes que o usuario está enviando para a aplicação) 
//res => response (devolver uma resposta para aquela requisição)

//req.query => Acessar query params (para filtros)
//req.params => Acessar route params (para edição, delete) 
//req.body => Acessar corpo da requisição (para criação, edição)

routes.post('/sessions', SessionController.store);
//upload.single porque eh uma unica imagem, se fosse varias utilizaria upload.array
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

//precisa ser feito uma rota nested (encadeada), pois o usuario quer criar uma reserva dentro desse spot com esse id
routes.post('/spots/:spot_id/bookings', BookingController.store);
//acessar a rota do usuário
//navegador só acessa a rota pelo método get, então precisamos de uma ferramenta para testar as rotas em conjunto (Imsonia)
//como estamos desenvolvendo uma api rest, não vamos devolver uma resposta em texto, mas sim em estrutura de dados(objeto ou array)


//exportar as rotas daqui para a aplicação conhecer as rotas

module.exports = routes;