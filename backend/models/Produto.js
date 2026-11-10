const db = require('../db/conn')
const {DataTypes} = require('sequelize')

const Produto = db.define('produto',{
    codProduto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    descricao:{
        type: DataTypes.STRING(50),
        allowNull:false
    },
    categoria:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    qtdeEstoque:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codLote:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    idFornecedor:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'fornecedores',
            key: 'codFornecedor'
        }
    }
},{
    timestamps: false,
    tableName: 'produtos'
})

module.exports = Produto