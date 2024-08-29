import { Router } from "express";
import usersRoutes from "./users.routes";
import appRoutes from "./app.routes";
import authRoutes from "./auth.routes";
import employeesRoutes from "./employee.routes";

const router = Router();

router.use(usersRoutes);
router.use(appRoutes);
router.use(authRoutes);
router.use(employeesRoutes);

export default router;
