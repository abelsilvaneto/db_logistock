const cryptoJS = require('crypto-js')
const Produto = require('../models/Produto')
const CHAVE_SEGREDO = 'chave_baixar'
const Fornecedor = require('../models/Fornecedor')

const Cadastrar = async (req, res) => {
    const valor = req.body

        if(!valor.nome || !valor.descricao || !valor.categoria || !valor.qtdeEstoque || !valor.codLote || !valor.idFornecedor){
        return res.status(400).json({message: 'coloque todos os valores para continuar'})
    }
    
    try {

    const fornecedor = await Fornecedor.findByPk(idFornecedor)
    if(!fornecedor){
        return res.status(401).json({message: 'fornecedor não encontrado'})
    }

    const codLoteCrypto = cryptoJS.AES.encrypt(valor.codLote, CHAVE_SEGREDO).toString()

    await Produto.create({
        nome: valor.nome,
        descricao: valor.descricao,
        categoria: valor.categoria,
        qtdeEstoque: valor.qtdeEstoque,
        codLote: codLoteCrypto,
        idFornecedor: valor.idFornecedor
    })

    res.status(200).json({message: 'Operação realizada com sucesso'})
    } catch (err) {
    res.status(500).json({message: 'Erro na operação'})
    console.error('Erro na operação',err)
    }
}

module.exports = {Cadastrar}