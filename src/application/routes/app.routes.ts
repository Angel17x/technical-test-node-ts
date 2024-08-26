import { Router } from "express";
import { AppController } from "../controllers";

const appRoutes = Router();
const path = "/";

const { init } = new AppController();

appRoutes.get(path, init);

export default appRoutes;
