import { Router } from "express";
import { UserController } from "../controllers";
import { adminMiddlware, authMiddleware } from "../middlewares";

const usersRoutes = Router();
const path = "/users";

const { getAllUsers, getUserById } = new UserController();

usersRoutes.get(path, authMiddleware, adminMiddlware, getAllUsers);
usersRoutes.get(path, authMiddleware, adminMiddlware, getUserById);

export default usersRoutes;
