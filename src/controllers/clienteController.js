// src/controllers/clienteController.js
const { isValidEmail } = require("../utils/validateEmail.js");
const { isValidPassword } = require("../utils/validatePassword.js");
const { isValidCPF } = require("../utils/validateCPF.js");
const { isValidPhone } = require("../utils/validatePhone.js");
const { formatDate } = require("../utils/formatDate.js");
const ClienteModel = require("../models/Cliente");

class Cliente {
  async buscarTodos(req, res) {
    try {
      const clientes = await ClienteModel.getAll();

      clientes.forEach((cliente) => {
        cliente.data_cadastro = formatDate(cliente.data_cadastro);
        cliente.data_desistencia = formatDate(cliente.data_desistencia);
      });
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const cliente = await ClienteModel.getById(id);

      cliente.data_cadastro = formatDate(cliente.data_cadastro);
      cliente.data_desistencia = formatDate(cliente.data_desistencia);

      if (cliente) {
        res.json(cliente);
      } else {
        res.status(404).json({ message: "Cliente não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async criar(req, res) {
    const novoCliente = req.body;

    const validationErrors = {};
    if (!novoCliente.nome || novoCliente.nome.trim() === "") {
      validationErrors.nome = "Nome é obrigatorio";
    }

    if (!isValidCPF(novoCliente.cpf)) {
      validationErrors.cpf = "CPF deve conter 11 digitos";
    }

    if (!isValidEmail(novoCliente.email)) {
      validationErrors.email = "Email inválido";
    }

    if (!isValidPhone(novoCliente.telefone)) {
      validationErrors.telefone = "Telefone deve conter entre 10 e 11 dígitos";
    }

    const passwordErrors = isValidPassword(novoCliente.senha);
    if (passwordErrors.length > 0) {
      validationErrors.senha = passwordErrors[0];
    }

    if (novoCliente.senha !== novoCliente.confirmarSenha) {
      validationErrors.confirmarSenha = "As senhas não coincidem";
    }

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ validationErrors });
    }

    try {
      const id = await ClienteModel.create(novoCliente);
      res.status(201).json({ id_cliente: id, ...novoCliente });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const data = req.body;

    const validationErrors = {};

    if (Object.keys(data).length === 1 && data.status !== undefined) {
      if (!["ativo", "inativo"].includes(data.status)) {
        return res.status(400).json({ message: "Status inválido" });
      }
    }

    if (data.nome !== undefined && data.nome.trim() === "") {
      validationErrors.nome = "Nome é obrigatório";
    }

    if (data.cpf !== undefined && !isValidCPF(data.cpf)) {
      validationErrors.cpf = "CPF deve conter 11 dígitos";
    }

    if (data.email !== undefined && !isValidEmail(data.email)) {
      validationErrors.email = "Email inválido";
    }

    if (data.telefone !== undefined && !isValidPhone(data.telefone)) {
      validationErrors.telefone = "Telefone deve conter entre 10 e 11 dígitos";
    }

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ validationErrors });
    }

    try {
      await ClienteModel.update(id, data);
      res.json({ message: "Cliente atualizado com sucesso" });
    } catch (error) {
      if (error.message === "Cliente não encontrado") {
        res.status(404).json({ message: "Cliente não encontrado" });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async apagar(req, res) {
    const { id } = req.params;
    try {
      const resultado = await ClienteModel.del(id);
      if (resultado.affectedRows > 0) {
        res.json({ message: "Cliente deletado com sucesso" });
      } else {
        res.status(404).json({ message: "Cliente não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarClientePorNomeOuCpf(req, res) {
    const { termo } = req.params;
    try {
      const clientes = await ClienteModel.getByNameOrCpf(termo);
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new Cliente();
