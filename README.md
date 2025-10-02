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
│   └── config/            # Configurações (será usado no commit 2)
```

## ▶️ Como rodar o projeto

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o servidor em modo desenvolvimento:

   ```bash
   npm run dev
   ```

3. Acesse no navegador ou via cURL:

   ```
   http://localhost:3000/
   ```

## 🔍 Testar rota de saúde

Verifique se o backend está funcionando:

```
GET http://localhost:3000/api/health
```

Resposta esperada:

```json
{ "status": "OK", "message": "Servidor funcionando corretamente!" }
```

ℹ️ Observação: a porta pode variar dependendo da configuração da sua máquina.  
Confira no terminal qual porta está sendo usada ao iniciar o servidor com:
```bash
npm run dev

---