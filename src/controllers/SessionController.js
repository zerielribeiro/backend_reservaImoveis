// metodos : index, show, update, store, destroy
/*
index : listagem de sessoes
store: cria sessoes
show: listar uma unica sessao
update: atualiza sesssao
destroi : deletar sessao
*/

import User from '../models/User';
import * as Yup from 'yup';

class SessionController{
   async store(req, res){
// validando usuario
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        })

        const { email } = req.body;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: ' falha na autenticação'});
        }

        // verificando se ja tem email cadastrado
        let user = await User.findOne({ email });
        if(!user){
         user = await User.create({ email });
        }
        
        return res.json(user);
    }

}
export default new SessionController();