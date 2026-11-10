const db = require('../db/conn')
const {DataTypes} = require('sequelize')

const Fornecedores = db.define('fornecedor',{
    codFornecedor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull:false
    },
    cnpj:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps: false,
    tableName: 'fornecedores'
})

module.exports = Fornecedores