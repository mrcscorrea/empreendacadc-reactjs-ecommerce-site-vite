import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddCoinsController, deleteCoinsController, getCoinsController, updateCoinsController } from "../controllers/coins.controller.js";

const coinsRouter = Router()

coinsRouter.post('/create',auth,AddCoinsController)
coinsRouter.post('/get',getCoinsController)
coinsRouter.put('/update',auth,updateCoinsController)
coinsRouter.delete('/delete',auth,deleteCoinsController)

export default coinsRouter