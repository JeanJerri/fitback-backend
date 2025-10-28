
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

  async criar(novaCategoria) {
    const sql = "INSERT INTO categoria SET ?";
    try {
      const [rows] = await conexao.query(sql, [novaCategoria]);
      console.log("Categoria criada com sucesso");
      return rows;
    } catch (error) {
      console.log("Erro ao criar categoria (model)");
      throw error;
    }
  }

  async atualizar(dadosAtualizados, id) {
    const sql = "UPDATE categoria SET ? WHERE id_categoria = ?";
    try {
      const [rows] = await conexao.query(sql, [dadosAtualizados, id]);
      console.log("Categoria atualizada com sucesso");
      return rows;
    } catch (error) {
      console.log("Erro ao atualizar categoria");
      throw error;
    }
  }

  async apagar(id) {
    const sql = "DELETE FROM categoria WHERE id_categoria = ?";
    try {
      const [rows] = await conexao.query(sql, id);
      console.log("Categoria apagada com sucesso");
      return rows;
    } catch (error) {
      console.log("Erro ao apagar categoria");
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