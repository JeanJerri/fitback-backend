const CategoriaModel = require('../models/Categoria');
class Categoria {
    buscar() {
        return CategoriaModel.listar();
    }
    criar() {
        return "Categoria criada com sucesso";
    }
    alterar(id) {
        return "Categoria " + id + " atualizada com sucesso";
    }
    apagar(id) {
        return "Categoria " + id + " deletada com sucesso";
    }

    /*
    async init(pool) {
        this.pool = pool;
        await this.criarCategoria();
    }

    async criarCategoria() {
        const sql = 
        `CREATE TABLE categorias (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            descricao TEXT,
            entidadeReferenciada VARCHAR(100),
            status VARCHAR(20) NOT NULL DEFAULT 'Ativa'
        );`

        try {
            await this.pool.query(sql);
            console.log('Tabela categorias criada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar tabela categorias:', error);
            
            if (error.sqlMessage) console.log(error.sqlMessage);
        }

    }
    */
}

module.exports = new Categoria();

//-----------------------------------------------

/*
const CategoriaModel = require('../models/Categoria');

module.exports = {
    async buscar(req, res) {
        try {
            const categorias = await CategoriaModel.listar();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar categorias' });
        }
    },
    criar(req, res) {
        res.send('Categoria criada com sucesso');
    },
    alterar(req, res) {
        const { id } = req.params;
        res.send(`Categoria ${id} atualizada com sucesso`);
    },
    apagar(req, res) {
        const { id } = req.params;
        res.send(`Categoria ${id} deletada com sucesso`);
    }
};

*/