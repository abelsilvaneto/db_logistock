const Movimentacao = require('./Movimentacao')
const Produto = require('./Produto')
const Fornecedor = require('./Fornecedor')
const Funcionario = require('./Funcionario')
const movimentacao = require('./Movimentacao')

Fornecedor.hasMany(Produto,{
    as: 'ProdutoFornecedor',
    foreignKey: 'idFornecedor',
    onDelete: 'CASCADE'
})

Produto.belongsTo(Fornecedor,{
    as: 'FornecedorProduto',
    foreignKey: 'idFornecedor',
    allowNull: false
})

Produto.hasOne(Movimentacao,{
    as: 'ProdutoMovimentacao',
    foreignKey: 'idProduto',
    onDelete: 'CASCADE'
})

Movimentacao.belongsTo(Produto,{
    as: 'MovimentacaoProduto',
    foreignKey: 'idProduto',
    allowNull: false
})

module.exports = {Fornecedor,Produto,Movimentacao,Funcionario}