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

    const validationErrors = {};

    if (!data.nome || data.nome.trim() === "") {
      validationErrors.nome = "Título do questionário é obrigatório";
    } else if (data.nome.length < 3 || data.nome.length > 100) {
      validationErrors.nome = "Título deve ter entre 3 e 100 caracteres";
    }

    if (!data.descricao || data.descricao.trim() === "") {
      validationErrors.descricao = "Descrição é obrigatória";
    } else if (data.descricao.length < 10 || data.descricao.length > 255) {
      validationErrors.descricao =
        "Descrição deve ter entre 10 e 255 caracteres";
    }

    if (!Array.isArray(data.perguntasIds)) {
      validationErrors.perguntasIds = "perguntasIds deve ser um array";
    } else if (data.perguntasIds.length === 0) {
      validationErrors.perguntasIds = "Selecione ao menos uma pergunta";
    } else {
      const idsInvalidos = data.perguntasIds.some(
        (id) => !Number.isInteger(id) || id <= 0
      );
      if (idsInvalidos) {
        validationErrors.perguntasIds =
          "perguntasIds deve conter apenas IDs válidos";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ validationErrors });
    }

    try {
      const id = await QuestionarioModel.criarModelo(data);
      res.status(201).json({ id, ...data });
    } catch (error) {
      if (error.message === "MODELO_DUPLICADO") {
        return res
          .status(409)
          .json({ error: "Já existe um questionário com esse nome" });
      }

      if (error.message === "PERGUNTA_INVALIDA") {
        return res
          .status(400)
          .json({ error: "Uma ou mais perguntas não existem" });
      }

      res.status(500).json({ error: error.message });
    }
  }

  async atualizarModelo(req, res) {
    const { id } = req.params;
    const data = req.body;
    const validationErrors = {};

    if (!data.nome || data.nome.trim() === "") {
      validationErrors.nome = "Título do questionário é obrigatório";
    } else if (data.nome.length < 3 || data.nome.length > 100) {
      validationErrors.nome = "Título deve ter entre 3 e 100 caracteres";
    }

    if (!data.descricao || data.descricao.trim() === "") {
      validationErrors.descricao = "Descrição é obrigatória";
    } else if (data.descricao.length < 10 || data.descricao.length > 255) {
      validationErrors.descricao =
        "Descrição deve ter entre 10 e 255 caracteres";
    }

    if (!Array.isArray(data.perguntasIds)) {
      validationErrors.perguntasIds = "perguntasIds deve ser um array";
    } else if (data.perguntasIds.length === 0) {
      validationErrors.perguntasIds = "Selecione ao menos uma pergunta";
    } else {
      const idsInvalidos = data.perguntasIds.some(
        (id) => !Number.isInteger(id) || id <= 0
      );
      if (idsInvalidos) {
        validationErrors.perguntasIds =
          "perguntasIds deve conter apenas IDs válidos";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ validationErrors });
    }
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

  async atualizarOrdemPerguntas(req, res) {
    const { id } = req.params;
    const { perguntasIds } = req.body;

    if (!Array.isArray(perguntasIds)) {
      return res.status(400).json({
        error: "perguntasIds deve ser um array",
      });
    }

    await QuestionarioModel.atualizarOrdemPerguntas(id, perguntasIds);
    res.json({ message: "Ordem atualizada com sucesso" });
  }
}

module.exports = new QuestionarioController();
