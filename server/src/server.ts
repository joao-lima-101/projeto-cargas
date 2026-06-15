import "dotenv/config";
import express from "express";
import { routes } from "./routes/index.js";
import cors, { type CorsOptions } from "cors";
import { errorMiddleware } from "./middlewares/error-middleware.js";

const port = process.env.SERVER_PORT || 3000;

const corsOpt: CorsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET,POST,PUT,PATCH",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

const app = express();

app.use(express.json());

app.use(cors(corsOpt));

app.use(routes);

app.use(errorMiddleware);

app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
