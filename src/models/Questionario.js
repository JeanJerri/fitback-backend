const db = require("../config/db");
const {
  buscarPerguntaPorId,
  buscarPerguntasPeloModelo,
  atualizarPergunta,
} = require("./Pergunta");

class QuestionarioModel {
  async listarModelos() {
    const sqlModelo = "SELECT * FROM questionario_modelo";
    const [rows] = await db.query(sqlModelo);
    for (const modelo of rows) {
      const perguntas = await buscarPerguntasPeloModelo(modelo.id_modelo);
      modelo.perguntas = perguntas;
    }
    return rows;
  }

  async buscarModeloPorId(id) {
    const sqlModelo = "SELECT * FROM questionario_modelo WHERE id_modelo = ?";
    const sqlPerguntas = buscarPerguntasPeloModelo(id);
    const [rows] = await db.query(sqlModelo, [id]);
    const perguntas = await sqlPerguntas;
    return { ...rows[0], perguntas };
  }

  async criarModelo(data) {
    const sqlModelo =
      "INSERT INTO questionario_modelo (nome, descricao, criado_por) VALUES (?, ?, ?)";
    const [result] = await db.query(sqlModelo, [
      data.nome,
      data.descricao,
      data.criado_por,
    ]);
    const questionarioId = result.insertId;

    for (const [index, id] of data?.perguntasIds.entries()) {
      const pergunta = await buscarPerguntaPorId(id);
      if (pergunta) {
        const sqlAssociarPergunta =
          "INSERT INTO modelo_pergunta (id_modelo, id_pergunta, ordem) VALUES (?, ?, ?)";
        await db.query(sqlAssociarPergunta, [questionarioId, id, index]);
      }
    }

    return questionarioId;
  }

  async atualizarModelo(id, data) {
    const sqlModelo =
      "UPDATE questionario_modelo SET nome = ?, descricao = ? WHERE id_modelo = ?";
    if (data.perguntasIds.length > 0) {
      const perguntasAtuais = await buscarPerguntasPeloModelo(id);
      const perguntasAtuaisIds = perguntasAtuais.map((p) => p.id_pergunta);
      
      for (const [index, idPergunta] of data.perguntasIds.entries()) {
        if (!perguntasAtuaisIds.includes(idPergunta)) {
          const sqlInserirPergunta =
            "INSERT INTO modelo_pergunta (id_modelo, id_pergunta, ordem) VALUES (?, ?, ?)";
          await db.query(sqlInserirPergunta, [id, idPergunta, index]);
        }
      }
      const sqlPerguntasDelete =
        "DELETE FROM modelo_pergunta WHERE id_modelo = ? AND id_pergunta NOT IN (?)";
      await db.query(sqlPerguntasDelete, [id, perguntasAtuaisIds]);
    }
    await db.query(sqlModelo, [data.nome, data.descricao, id]);
  }

  async deletarModelo(id) {
    const sql = "DELETE FROM questionario_modelo WHERE id_modelo = ?";
    await db.query(sql, [id]);
  }
}

module.exports = new QuestionarioModel();
