const PerguntaModel = require('../models/Pergunta');

class PerguntaController {
  async listar(req, res) {
    try {
      const { search, categoria, tipo } = req.query;
      const perguntas = await PerguntaModel.listar({ search, categoria, tipo });
      res.json(perguntas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PerguntaController();
