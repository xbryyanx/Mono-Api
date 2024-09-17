import { Router } from "express";
import { CaseRoutes } from "./controllers/monoCases/routes";

export class AppRoutes{
    static get routes() :Router{
        const router = Router();
        router.use("/api/monoCases", CaseRoutes.routes);
        return router;
    }
}