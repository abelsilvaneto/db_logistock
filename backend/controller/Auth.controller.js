const cryptoJS = require('crypto-js')
const Funcionario = require('../models/Funcionario')
const CHAVE_SEGREDO = 'chave_baixar'

const Login = async (req, res) => {
    const valor = req.body

    if (!valor.email || !valor.senha) {
        return res.status(400).json({ message: 'coloque todos os valores para continuar' })
    }

    try {

        const funcionario = await Funcionario.findOne({where: {email: valor.email}})
        if(!funcionario){
            return res.status(401).json({message: 'Funcionario não achado'})
        }

        const bytes = cryptoJS.AES.decrypt(valor.senha, CHAVE_SEGREDO)
        console.log(bytes)
        const senhaDescrypto = bytes.toString(cryptoJS.enc.Utf8)
        console.log(senhaDescrypto)

        if(senhaDescrypto ==! valor.senha){
            return res.status(401).json({message: 'senha incorreta'})
        }

        const TempoMs = 240 * 60 * 1000
        const tempoExpiraem = Date.now() + TempoMs

        const payload = {
         idFuncionario: funcionario.codFuncionario,
         email: funcionario.email,
         expiraEm : tempoExpiraem
        }

        const token = cryptoJS.AES.encrypt(JSON.stringify(payload),CHAVE_SEGREDO).toString()

        res.status(200).json({
            message: 'Login realizado com sucesso',
            toekn: token,
            email: funcionario.email
        })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

module.exports = { Login }