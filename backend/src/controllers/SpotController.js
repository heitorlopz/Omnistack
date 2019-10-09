const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {

    //listagem de spot
    async index(req, res) {
        //filtrando spots por tecnologias
        const { tech } = req.query;

        //vai me retornar so os spots que tem a tecnologia vinculada a variavel "tech", que no imsonia eu coloquei como ReactJS
        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    async store(req, res) {
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        //autenticaçao -> caso o usuario nao exista, retorna um erro
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            //como techs é um array, a gente separa ele e tira os espaços em branco caso tenha
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return res.json(spot);
    }
};