//index, show, store, update, destroy => metódos pro controller
//index => retorna listagem de sessões
//show => retorna uma única sessão
//store => criar uma sessão
//update => alterar uma sessão
//destroy => remover uma sessão
//por padrões do mvc e da comunidade, não criamos mais métodos alem desses

const User = require('../models/User');

module.exports = {
    //usar assincronismo porque no banco de dados, a informação a ser lida pode demorar, então vamos fazer com que o código seja lido meio que sequencialmente 
    async store(req, res) {
        //desestruturei a variável, por isso as chaves na variável abaixo (recurso js), ou seja, buscando email em req.body <=> seria a mesma coisa de req.body.email
        const { email } = req.body;

        //agora vamos fazer uma verificaçao se o email que foi passado já é existente
        let user = await User.findOne({ email });

        if (!user) {

            //utilizei o await porque o código só vai dar continuidade quando o "User.create({ email})" for executado, ou seja, quando fizer o cadastro no banco 
            user = await User.create({ email });
        }

        //retornar uma resposta que será um usuário (objeto) em json
        return res.json(user);
    }

}