require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

require("./routes")(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api", (req, res) => {
  res.json({
    message: "Bem-vindo à API Fitback",
    hint: "Os endpoints estão disponíveis sob /api/*",
    example: [
      "api/clientes",
      "/api/perguntas",
      "/api/categorias",
      "/api/questionarios",
      "/api/filiais",
    ],
  });
});
