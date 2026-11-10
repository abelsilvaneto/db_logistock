const cryptoJS = require('crypto-js')
const Funcionario = require('../models/Funcionario')
const CHAVE_SEGREDO = 'chave_baixar'

const Cadastrar = async (req, res) => {
    const valor = req.body

        if(!valor.email || !valor.senha){
        return res.status(400).json({message: 'coloque todos os valores para continuar'})
    }
    
    try {

    const senhaCrypto = cryptoJS.AES.encrypt(valor.senha, CHAVE_SEGREDO).toString()

    await Funcionario.create({
        email: valor.email,
        senha: senhaCrypto
    })

    res.status(200).json({message: 'Operação realizada com sucesso'})
    } catch (err) {
    res.status(500).json({message: 'Erro na operação'})
    console.error('Erro na operação',err)
    }
}

module.exports = {Cadastrar}