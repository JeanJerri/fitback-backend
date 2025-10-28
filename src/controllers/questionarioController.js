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
}

module.exports = new QuestionarioController();
