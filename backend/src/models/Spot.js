const mongoose = require('mongoose');


const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    //precisa do usuario que criou o spot, no caso so o id referente ao usuario no banco de dados, e tambem a referencia a qual model tá essa informaçao
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    }, {
        //o toJSON vai servir para que toda vez os spots forem convertidos em JSON, ele pegue os virtuals (objeto passado) e seja convertido automaticamente para JSON, assim conseguindo passar a url da thumbnail como feito la embaixo
        toJSON: {
            virtuals: true,
        },
    });
//isso foi criado após mexer na parte do front-end do spot, pois não dá simplesmente para consumir as imagens geradas aqui no backend da maneira que estava acontecendo
//então vamos criar um campo que vai ser computado pelo js -> dentro do mongo, é chamado de virtual

SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`
})
module.exports = mongoose.model('Spot', SpotSchema);