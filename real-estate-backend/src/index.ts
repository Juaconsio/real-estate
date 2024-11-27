import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getLandingPage } from "./puppeter";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server + PEro hic ");
});



app.get("/properties", (req: Request, res: Response) => {
  const properties = getLandingPage();
  res.send(properties);
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});