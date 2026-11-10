const { where } = require('sequelize')
const Fornecedores = require('../models/Fornecedor')
const cryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'

const Cadastrar = async (req, res) => {
    const valor = req.body

    if (!valor.nome || !valor.cpf || !valor.cnpj) {
        return res.status(400).json({ message: 'coloque todos os valores para continuar' })
    }

    try {

        if (valor.cpf.lenght == !11) {
            return res.status(401).json({ Message: 'O cpf deve ter 11 números' })
        }
        const cpfCrypto = cryptoJS.AES.encrypt(valor.cpf, CHAVE_SEGREDO).toString()
        const cnpjCrypto = cryptoJS.AES.encrypt(valor.cnpj, CHAVE_SEGREDO).toString()

        await Fornecedores.create({
            nome: valor.nome,
            cpf: cpfCrypto,
            cnpj: cnpjCrypto
        })

        res.status(200).json({ message: 'Operação realizada com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const ConsultarCod = async (req, res) => {
    const id = req.params.id

    try {
        const fornecedor = await Fornecedores.findByPk(id)
        if (!fornecedor) {
            return res.status(401).json({ message: 'Fornecedor não achado' })
        }

        const bytesCpf = cryptoJS.AES.decrypt(fornecedor.cpf, CHAVE_SEGREDO).toString()
        const bytescnpj = cryptoJS.AES.decrypt(fornecedor.cnpj, CHAVE_SEGREDO).toString()

        res.status(201).json({
            codFornecedor: fornecedor.codFornecedor,
            nome: fornecedor.nome,
            cpf: bytesCpf,
            cnpj: bytescnpj
        })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const ConsultarNome = async (req, res) => {
    const nome = req.params.nome

    try {
        const fornecedor = await Fornecedores.findOne({ where: { nome: nome } })
        if (!fornecedor) {
            return res.status(401).json({ message: 'Fornecedor não achado' })
        }

        const bytesCpf = cryptoJS.AES.decrypt(fornecedor.cpf, CHAVE_SEGREDO).toString()
        const bytescnpj = cryptoJS.AES.decrypt(fornecedor.cnpj, CHAVE_SEGREDO).toString()

        res.status(201).json({
            codFornecedor: fornecedor.codFornecedor,
            nome: fornecedor.nome,
            cpf: bytesCpf,
            cnpj: bytescnpj
        })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const Apagar = async (req, res) => {
    const id = req.params.id

    try {
        const fornecedor = await Fornecedores.findByPk(id)
        if (!fornecedor) {
            return res.status(401).json({ message: 'Fornecedor não achado' })
        }

        await Fornecedores.destroy({ where: { codFornecedor: id } })

        res.status(201).json({ message: 'Operação realizada com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const Atualizar = async (req, res) => {
    const id = req.params.id
    const valor = req.body

    if (!valor.nome || !valor.cpf || !valor.cnpj) {
        return res.status(400).json({ message: 'coloque todos os valores para continuar' })
    }

    try {
        const fornecedor = await Fornecedores.findByPk(id)
        if (!fornecedor) {
            return res.status(401).json({ message: 'Fornecedor não achado' })
        }

        const dadosAtualizar = { ...valor }

        if (valor.cpf) {
            if (valor.cpf.lenght == !11) {
                return res.status(401).json({ Message: 'O cpf deve ter 11 números' })
            }
            dadosAtualizar.cpf = cryptoJS.AES.encrypt(valor.cpf,CHAVE_SEGREDO).toString()
        }

        if (valor.cnpj) {
            dadosAtualizar.cnpj = cryptoJS.AES.encrypt(valor.cnpj,CHAVE_SEGREDO).toString()
        }

        res.status(201).json({message: 'Operação realizada com sucesso'})
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const Listar = async (req, res) => {

    try {
        const fornecedor = await Fornecedores.findAll()
        let resultado = []
 
        fornecedor.forEach((el)=>{
            let cpfDescrypto = ''
            let cnpjDescrypto = ''
            try{
            const bytesCpf = cryptoJS.AES.decrypt(el.cpf, CHAVE_SEGREDO)
            const bytesCnpj = cryptoJS.AES.decrypt(el.cnpj, CHAVE_SEGREDO)
            cpfDescrypto = bytesCpf.toString(cryptoJS.enc.Utf8)
            cnpjDescrypto = bytesCnpj.toString(cryptoJS.enc.Utf8)
            }catch(err){
            cpfDescrypto = 'Erro na crptografia'
            cnpjDescrypto = 'Erro na crptografia'
            console.error( cpfDescrypto, err)
            console.error( cnpjDescrypto, err)
            }
            resultado.push({
                codFornecedor: el.codFornecedor,
                nome: el.nome,
                cpf: el.cpfDescrypto,
                cnpj: el.cnpjDescrypto
            })
        })

        res.status(201).json(resultado)
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

module.exports = {Cadastrar, ConsultarCod, ConsultarNome, Apagar, Atualizar, Listar}