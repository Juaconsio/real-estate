import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { initializeDatabase, sequelize } from "./config/database";
import cors from 'cors';
import router from "./routes/router";
import errorHandler from "./middleware/errorHandler";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    [key: string]: any;
  }
}

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  console.log('Body:', req.body); // Muestra el body
  next(); // Continúa con el siguiente middleware o manejador
};


app.use(express.json());
app.use(loggerMiddleware);
app.use(cors({
  origin: ['http://localhost:5173', 'http://frontend:5173'],
  credentials: true,
  // origin: '*',
}));

app.use(
  session({
    secret: "real-estate", // Cambia a un secreto seguro
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Protege contra acceso vía JavaScript
      secure: false, // En desarrollo, `false` para HTTP; `true` en producción (HTTPS)
      sameSite: "lax", // Permite cookies con credenciales en el mismo sitio y subdominios
    },
  })
);


app.use('/', router);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use(errorHandler);

async function startServer() {
  await initializeDatabase(sequelize);
  app.listen(port, () => {
    console.log(`[server]: Servidor corriendo en http://localhost:${port}`);
  });
}


startServer();