const db = require('../db/conn')
const {DataTypes} = require('sequelize')

const movimentacao = db.define('movimentacao',{
    codMov:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
        idProduto:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'produtos',
            key: 'codProduto'
        }
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    tipoMov:{
        type: DataTypes.ENUM('SAIDA','ENTRADA'),
        allowNull:false
    },
    qtdeMov:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'movimentacoes'
})

module.exports = movimentacao