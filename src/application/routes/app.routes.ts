import { Router } from "express";
import { AppController } from "../controllers";

const appRoutes = Router();
const path = "";

const { init, test } = new AppController();

appRoutes.get(path, init);
appRoutes.post(`${path}/test`, test);

export default appRoutes;
