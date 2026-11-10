const {Fornecedor,Produto,Movimentacao,Funcionario} = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {
    try{
    await conn.sync({force:true})
    console.log('realizando a conexão')
    }catch(err){
    console.error('erro ao realizar a conexão',err)
    }finally{
    await conn.close()
    console.log('finalizando a conexão')
    }
}

syncDataBase()