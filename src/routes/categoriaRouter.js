const{Router} = require("express");
//const Router = require('express').Router(); mema coisa

const router = Router();

const categoriaController = require("../controllers/categoriaController");

// Verbos HTTP
router.get("/", async (req, res) => {
    const listaCategorias = categoriaController.buscar();
    listaCategorias.then(categorias => 
        res.status(200).json(categorias)
    ).catch(error => {
        res.status(400).json({error: error.message});
    })
});

router.post('/', (req, res) => {
    const resposta = categoriaController.criar();
    res.send(resposta);
})

router.put('/:id', (req, res) => {
    const {id} = req.params; //armazena o id da requisicao
    const resposta = categoriaController.alterar(id);
    res.send(resposta);
    })
    
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const resposta = categoriaController.apagar(id);
    res.send(resposta);
    })

module.exports = router; //exporta como modulo