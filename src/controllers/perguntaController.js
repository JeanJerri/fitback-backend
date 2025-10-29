const PerguntaModel = require("../models/Pergunta");

class PerguntaController {

  async buscarPerguntaPorQuery(req, res) {
    try {
      const { search, categoria, tipo } = req.query;
      const perguntas = await PerguntaModel.listar({ search, categoria, tipo });
      res.json(perguntas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async listarPerguntas(req, res) {
    try {
      const perguntas = await PerguntaModel.listarPerguntas();
      res.json(perguntas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarPerguntaPorId(req, res) {
    const { id } = req.params;
    try {
      const pergunta = await PerguntaModel.buscarPerguntaPorId(id);
      if (!pergunta) {
        return res.status(404).json({ error: "Pergunta não encontrada" });
      }
      res.json(pergunta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async criarPergunta(req, res) {
    const data = req.body;
    try {
      const id = await PerguntaModel.criarPergunta(data);
      res.status(201).json({ id, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async atualizarPergunta(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      await PerguntaModel.atualizarPergunta(id, data);
      res.json({ message: "Pergunta atualizada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletarPergunta(req, res) {
    const { id } = req.params;
    try {
      await PerguntaModel.deletarPergunta(id);
      res.json({ message: "Pergunta deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PerguntaController();
