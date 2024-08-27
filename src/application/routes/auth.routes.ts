import { Router } from "express";
import { AuthController } from "../controllers";

const authRoutes = Router();
const path = "/auth";

const { register, login } = new AuthController();

authRoutes.post(`${path}/register`, register);
authRoutes.post(`${path}/login`, login);

export default authRoutes;
