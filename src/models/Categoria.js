
const conexao = require('../config/db')
class CategoriaModel {

  async listar() {
    const sql = "SELECT * FROM categoria";
    try {
      const [rows] = await conexao.query(sql);
      console.log("Consultas buscadas com sucesso");
      return rows;
    } catch (error) {
      console.log("Erro ao buscar consultas");
      throw error;
    }
  }

  /*
  listar() {
    const sql = "SELECT * FROM categorias";
    return new Promise((resolve, reject) => {
      conexao.query(sql, {}, (error, resposta) => {
        if(error) {
          console.log("Erro ao buscar consultas");
          reject(error);
        }
        resolve(resposta);
        console.log("Consultas buscadas");
      });
    }) 
  }

  */
}

module.exports = new CategoriaModel();