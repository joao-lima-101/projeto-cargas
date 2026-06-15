import { Router } from "express";
import authRoutes from "./auth-routes.js";
import carrierRoutes from "./carrier-routes.js";
import userRoutes from "./user-routes.js";
import agendaRoutes from "./agenda-routes.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const routes = Router();

routes.use("/auth", authRoutes);

routes.use("/transportadora", carrierRoutes);

routes.use("/usuario", authMiddleware, userRoutes);

routes.use("/agendamento", authMiddleware, agendaRoutes);

export { routes };
