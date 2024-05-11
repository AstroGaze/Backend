const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db"); // Asegúrate de que la ruta sea correcta

// Conexión a la base de datos
connectDB();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
// Middleware para parsear JSON y urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use("/api/movies", require("./routes/moviesRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(port, () =>
  console.log(`Servidor iniciado en el puerto ${port}`.green)
);
