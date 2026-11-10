const cryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: 'token não fornecido' })
    }

    try {
        const bytes = CryptoJS.AES.decrypt(token, CHAVE_SEGREDO)
        const dadosDescrypto = bytes.toString(cryptoJS.enc.Utf8)

        if (!dadosDescrypto) {
            return res.status(401).json({ Message: 'token invalido' })
        }

        const payload = JSON.parse(dadosDescrypto)

        if (Date.now() < payload.expiraEm) {
            return res.status(401).json({ message: 'tempo expirado' })
        }

        next()
    } catch (err) {
       return res.status(500).json({message: 'Erro na operação'})
    }
}

module.exports = authMiddleware