const { Router } = require('express');
const router = Router();

// Exemplo de rota GET para clientes
router.get('/', (req, res) => {
	res.send('Rota de clientes funcionando!');
});

module.exports = router;
