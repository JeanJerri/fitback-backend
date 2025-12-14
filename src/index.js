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
app.listen(PORT, (erro) => {
  if (erro) {
    console.error("Erro ao iniciar o servidor:", erro);
    return;
  }
  console.log(`Server running on http://localhost:${PORT}`);
});
