import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { initializeDatabase, sequelize } from "./config/database";
import cors from 'cors';
import router from "./routes/router";
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

app.use(express.json());

app.use(cors({
  // origin: ['http://localhost:5173', 'http://frontend:5173']
  origin: '*',
}));

app.use(
  session({
    secret: 'real-estate-secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      sameSite: true,
      secure: false
    }
  })
);


app.use('/', router);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});


async function startServer() {
  await initializeDatabase(sequelize);
  app.listen(port, () => {
    console.log(`[server]: Servidor corriendo en http://localhost:${port}`);
  });
}


startServer();