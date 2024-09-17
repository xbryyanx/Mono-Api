import { Router } from "express";
import { CaseController } from "./controllers";



export class CaseRoutes{
    static get routes(): Router {
        const router = Router();
        const controller = new CaseController();
        router.get("/recentCases", controller.fetchRecentCases);
        router.get("/", controller.fetchAllCases);
        router.get("/:id", controller.fetchCaseById);
        router.post("/", controller.addNewCase);
        router.put("/:id", controller.modifyCase);
        router.delete("/:id", controller.removeCase);
      
        return router;

    }
}