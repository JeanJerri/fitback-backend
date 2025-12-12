const PerguntaModel = require("../models/Pergunta");

class PerguntaController {
  async buscarPerguntaPorQuery(req, res) {
    try {
      const { termo, idCategoria, tipo } = req.query;
      const perguntas = await PerguntaModel.listarPorFiltros({
        termo,
        idCategoria,
        tipo,
      });
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

    const validationErrors = {};

    if (!data.conteudo || data.conteudo.trim() === "") {
      validationErrors.conteudo = "Texto da pergunta é obrigatório";
    }

    if (!data.id_categoria) {
      validationErrors.id_categoria = "Categoria é obrigatória";
    }

    if (!data.tipo) {
      validationErrors.tipo = "Tipo é obrigatório";
    }

    if (
      data.tipo === "multipla_escolha" &&
      (!data.opcoes ||
        data.opcoes.length < 2 ||
        data.opcoes.some((o) => !o.texto || o.texto.trim() === ""))
    ) {
      validationErrors.opcoes =
        "Múltipla escolha deve ter pelo menos duas opções";
    }

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ validationErrors });
    }

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

    const validationErrors = {};

    if (!data.conteudo || data.conteudo.trim() === "") {
      validationErrors.conteudo = "Texto da pergunta é obrigatório";
    }

    if (!data.id_categoria) {
      validationErrors.id_categoria = "Categoria é obrigatória";
    }

    if (!data.tipo) {
      validationErrors.tipo = "Tipo é obrigatório";
    }

    if (
      data.tipo === "multipla_escolha" &&
      (!data.opcoes ||
        data.opcoes.length < 2 ||
        data.opcoes.some((o) => !o.texto || o.texto.trim() === ""))
    ) {
      validationErrors.opcoes =
        "Múltipla escolha deve ter pelo menos duas opções";
    }

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ validationErrors });
    }

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
