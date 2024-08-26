import { Router } from "express";
import usersRoutes from "./users.routes";
import appRoutes from "./app.routes";

const router = Router();

router.use(usersRoutes);
router.use(appRoutes);

export default router;
