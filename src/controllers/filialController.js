const FilialModel = require("../models/Filial");

class FilialController {
  async buscarPorFiltros(req, res) {
    try {
      const { termo } = req.query;
      const filiais = await FilialModel.buscarPorFiltros({
        termo,
      });
      res.json(filiais);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarTodos(req, res) {
    try {
      const filiais = await FilialModel.buscarTodos();
      res.json(filiais);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const filial = await FilialModel.buscarPorId(id);
      if (!filial) {
        return res.status(404).json({ error: "Filial não encontrada" });
      }
      res.json(filial);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async criar(req, res) {
    const novaFilial = req.body;

    const validationErrors = {};

    if (!novaFilial.nome || novaFilial.nome.trim() === "") {
      validationErrors.nome = "Nome é obrigatório";
    }

    if (!novaFilial.endereco || novaFilial.endereco.trim() === "") {
      validationErrors.endereco = "Endereço é obrigatório";
    }

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ validationErrors });
    }

    try {
      const id = await FilialModel.criar(novaFilial);
      res.status(201).json({ id, ...novaFilial });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const filialAtualizada = req.body;

    const validationErrors = {};

    if (!filialAtualizada.nome || filialAtualizada.nome.trim() === "") {
      validationErrors.nome = "Nome é obrigatório";
    }

    if (!filialAtualizada.endereco || filialAtualizada.endereco.trim() === "") {
      validationErrors.endereco = "Endereço é obrigatório";
    }

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ validationErrors });
    }

    try {
      await FilialModel.atualizar(id, filialAtualizada);
      res.json({ message: "Filial atualizada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletar(req, res) {
    const { id } = req.params;
    try {
      await FilialModel.deletar(id);
      res.json({ message: "Filial deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new FilialController();
