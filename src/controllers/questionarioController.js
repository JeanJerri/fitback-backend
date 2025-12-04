const QuestionarioModel = require("../models/Questionario");

class QuestionarioController {
  async listarModelos(req, res) {
    try {
      const modelos = await QuestionarioModel.listarModelos();
      res.json(modelos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarModeloPorId(req, res) {
    const { id } = req.params;
    try {
      const modelo = await QuestionarioModel.buscarModeloPorId(id);
      if (!modelo) {
        return res.status(404).json({ error: "Modelo não encontrado" });
      }
      res.json(modelo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async listarPerguntasModelo(req, res) {
    const { id } = req.params;
    try {
      const perguntas = await QuestionarioModel.listarPerguntasModelo(id);
      res.json(perguntas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async substituirPerguntasModelo(req, res) {
    const { id } = req.params;
    const { perguntas } = req.body; // expect [{ id_pergunta, ordem }, ...]
    try {
      await QuestionarioModel.substituirPerguntasModelo(id, perguntas);
      res.json({ message: "Perguntas do modelo atualizadas com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async criarModelo(req, res) {
    const data = req.body;
    try {
      const id = await QuestionarioModel.criarModelo(data);
      res.status(201).json({ id, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async atualizarModelo(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      await QuestionarioModel.atualizarModelo(id, data);
      res.json({ message: "Modelo atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletarModelo(req, res) {
    const { id } = req.params;
    try {
      await QuestionarioModel.deletarModelo(id);
      res.json({ message: "Modelo deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarModelosPorQuery(req, res) {
    console.log("Entrou em buscarModelosPorQuery");
    try {
      const { termo } = req.query;
      console.log(termo);

      if (!termo || termo.trim() === "") {
        return res
          .status(400)
          .json({ erro: "O parâmetro termo é obrigatório." });
      }

      const resultados = await QuestionarioModel.buscarQuestionariosPorQuery(
        termo
      );
      
      res.json(resultados);
    } catch (erro) {
      console.error("Erro ao buscar questionários:", erro);
      return res
        .status(500)
        .json({ erro: "Erro interno ao buscar questionários." });
    }
  }
}

module.exports = new QuestionarioController();
