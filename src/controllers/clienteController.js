// src/controllers/clienteController.js

const ClienteModel = require('../models/Cliente');

class Cliente {
    async buscarTodos(req, res) {
        try {
            const clientes = await ClienteModel.getAll();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async buscarPorId(req, res) {
        const { id } = req.params; // Este é o id_cliente
        try {
            const cliente = await ClienteModel.getById(id);
            if (cliente) {
                res.json(cliente);
            } else {
                res.status(404).json({ message: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async criar(req, res) {
        const novoCliente = req.body; // Envia todos os dados (nome, email, senha, telefone, etc)
        try {
            const id = await ClienteModel.create(novoCliente);
            res.status(201).json({ id_cliente: id, ...novoCliente });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async atualizar(req, res) {
        const { id } = req.params; // id_cliente
        const dadosAtualizados = req.body;
        try {
            await ClienteModel.update(id, dadosAtualizados);
            res.json({ message: 'Cliente atualizado com sucesso' });
        } catch (error) {
            if (error.message === 'Cliente não encontrado') {
                res.status(404).json({ message: 'Cliente não encontrado' });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async apagar(req, res) {
        const { id } = req.params; // id_cliente
        try {
            const resultado = await ClienteModel.del(id);
            if (resultado.affectedRows > 0) {
                res.json({ message: 'Cliente deletado com sucesso' });
            } else {
                res.status(404).json({ message: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new Cliente();