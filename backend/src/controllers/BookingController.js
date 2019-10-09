const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {

        const { user_id } = req.headers;
        //vamos usar req.params aqui porque estamos fazendo uma reserva em um spot, nao da para fazer a reserva sem ter um spot
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        })

        //mostrar as informaçoes do usuario e do spot no imsonia
        await booking.populate('spot').populate('user').execPopulate();

        return res.json(booking);
    }

};