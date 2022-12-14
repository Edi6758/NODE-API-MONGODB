const TaskModel = require('../model/TaskModel')
const { isPast } = require('date-fns')

const TaskValidation = async (req, res, next) => {
    const { macaddress, type, title, description, when } = req.body
    if (!macaddress)
        return res.status(400).json({ error: 'macaddress é obrigatório' })
    else if (!type)
        return res.status(400).json({ error: 'tipo é obrigatório' })
    else if (!title)
        return res.status(400).json({ error: 'título é obrigatório' })
    else if (!description)
        return res.status(400).json({ error: 'descrição é obrigatório' })
    else if (!when)
        return res.status(400).json({ error: 'Data e hora são obrigatórios' })
    else if (isPast(new Date(when)))
        return res.status(400).json({ error: 'Escolha uma data e hora futura' })
    else {
        let exists;

        if (req.params.id) {
            exists = await TaskModel.
                findOne(
                    {
                        '_id': { '$ne': req.params.id }, //'ne' is an denial operator in mongo
                        'when': { '$eq': new Date(when) }, //'eq' is an equality operator in mongo
                        'macaddress': { '$in': macaddress } //'$in' is an in operator in mongo
                    })
        } else {
            exists = await TaskModel.
                findOne(
                    {
                        'when': { '$eq': new Date(when) }, //'eq'  is an equality operator in mongo
                        'macaddress': { '$in': macaddress } //'$in' is an in operator in mongo
                    })
        }

        if (exists) {
            return res.status(400).json({ error: 'já existe uma tarefa nesse dia e horário...' })
        }

        next()
    }
}

module.exports = TaskValidation;