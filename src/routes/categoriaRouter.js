const{Router} = require("express");
//const Router = require('express').Router(); mema coisa

const router = Router();

const categoriaController = require("../controllers/categoriaController");

// Verbos HTTP
router.get("/", async (req, res) => {
        try {
        const categorias = await categoriaController.buscar();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const novaCategoria = req.body;
        const resultado = await categoriaController.criar(novaCategoria);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

router.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const dadosAtualizados = req.body;
    const resultado = await categoriaController.alterar(dadosAtualizados, id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await categoriaController.apagar(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});


module.exports = router; //exporta como modulo