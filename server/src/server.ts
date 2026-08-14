import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { routes } from "./routes/index.js";
import cors, { type CorsOptions } from "cors";
import { errorMiddleware } from "./middlewares/error-middleware.js";

const port = process.env.SERVER_PORT || 3000;

const corsOpt: CorsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET,POST,PUT,PATCH",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOpt));

app.use(cookieParser());

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
