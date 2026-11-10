const Movimento = require('../models/Movimento')
const Produto = require('../models/Produto')
const cryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'

const Cadastrar = async (req, res) => {
    const valor = req.body

    if (!valor.idProduto || !valor.data || !valor.tipoMov || !valor.qtdeMov) {
        return res.status(400).json({ message: 'coloque todos os valores para continuar' })
    }

    try {

        const produto = await Produto.findByPk(valor.idProduto)

        if(!produto){
            return res.status(401).json({message:'Produto não encontrado'})
        }

        await Movimento.create(valor)

        res.status(200).json({ message: 'Operação realizada com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}


const Listar = async (req, res) => {

    try {
        const fornecedor = await Movimento.findAll()

        res.status(201).json(fornecedor)
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

module.exports = {Cadastrar, Listar}