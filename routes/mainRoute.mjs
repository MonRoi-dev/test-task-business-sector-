import { Router } from "express";
import mainController from "../controllers/mainController.mjs";

const router = Router()

router.get('/', mainController.getMain)


export default router