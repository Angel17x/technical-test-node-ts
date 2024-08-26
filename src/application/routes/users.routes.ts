import { Router } from "express";
import { UserController } from "../controllers";

const usersRoutes = Router();
const path = "/users";

const { getAllUsers, getUserById } = new UserController();

usersRoutes.get(path, getAllUsers);
usersRoutes.get(path, getUserById);

export default usersRoutes;
