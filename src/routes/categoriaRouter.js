const { Router } = require("express");
const router = Router();
const categoriaController = require("../controllers/categoriaController");

router.get("/", categoriaController.buscar);

router.post("/", (req, res) => {
  const resposta = categoriaController.criar();
  res.send(resposta);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const resposta = categoriaController.alterar(id);
  res.send(resposta);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const resposta = categoriaController.apagar(id);
  res.send(resposta);
});

module.exports = router;
