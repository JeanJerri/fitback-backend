const FilialModel = require("../models/Filial");

class FilialController {
  async buscarFilialPorQuery(req, res) {
    try {
      const { termo } = req.query;
      const filiais = await FilialModel.buscarFilialPorFiltros({
        termo,
      });
      res.json(filiais);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async listarFiliais(req, res) {
    try {
      const filiais = await FilialModel.listarFiliais();
      res.json(filiais);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarFilialPorId(req, res) {
    const { id } = req.params;
    try {
      const filial = await FilialModel.buscarFilialPorId(id);
      if (!filial) {
        return res.status(404).json({ error: "Filial não encontrada" });
      }
      res.json(filial);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async criarFilial(req, res) {
    const data = req.body;
    try {
      const id = await FilialModel.criarFilial(data);
      res.status(201).json({ id, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async atualizarFilial(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      await FilialModel.atualizarFilial(id, data);
      res.json({ message: "Filial atualizada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletarFilial(req, res) {
    const { id } = req.params;
    try {
      await FilialModel.deletarFilial(id);
      res.json({ message: "Filial deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new FilialController();
