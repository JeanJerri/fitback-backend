# Backend (Node + Express)

Estrutura inicial do backend do projeto.

## 📂 Estrutura de pastas

```
fitback-backend/
│── .gitignore
│── package.json
│── package-lock.json
│── README.md
│── src/
│   ├── server.js          # Ponto de entrada do servidor
│   ├── routes/            # Definição de rotas
│   │   └── index.js
│   ├── controllers/       # Controladores de cada rota
│   │   └── healthController.js
│   ├── middlewares/       # Middlewares (ex: autenticação, logs)
│   └── config/
|       └── db.js          # Configuração da conexão MySQL
|   └── models/            # Modelos (ORM ou consultas diretas)
|       └── exemploModel.js
```

---

## ▶️ Como rodar o projeto

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto baseado no `.env.example` e ajuste os valores conforme seu ambiente:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=suasenha
   DB_NAME=fitback
   DB_PORT=3306
   ```

3. Crie o banco de dados e tabela de teste no MySQL:

   ```sql
   CREATE DATABASE IF NOT EXISTS fitback;
   USE fitback;

   CREATE TABLE usuarios (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nome VARCHAR(100) NOT NULL
   );

   INSERT INTO usuarios (nome) VALUES ('João'), ('Maria'), ('José');
   ```

4. Inicie o servidor em modo desenvolvimento:

   ```bash
   npm run dev
   ```

5. Verifique no terminal se a conexão foi estabelecida:

   ```
   ✅ Conexão com MySQL estabelecida!
   ```

---

## 🔍 Testes de rotas

### Rota de saúde

```
GET http://localhost:3000/api/health
```

Resposta esperada:

```json
{ "status": "OK", "message": "Servidor funcionando corretamente!" }
```

### Rota de usuários (banco de dados)

```
GET http://localhost:3000/api/usuarios
```

Resposta esperada:

```json
[
  { "id": 1, "nome": "Jean" },
  { "id": 2, "nome": "Maria" },
  { "id": 3, "nome": "Carlos" }
]
```

---

ℹ️ **Observação:** a porta pode variar dependendo da configuração da sua máquina.
Confira no terminal qual porta está sendo usada ao iniciar o servidor com:

```bash
npm run dev
```

---