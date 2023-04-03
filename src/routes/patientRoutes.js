import { Router } from "express";
import patientController from "../controllers/patientController.js";
import {validateSchemma} from "../middlewares/schemaValidationMiddleware.js"
import {patientSchemma} from "../schemas/patientSchema.js"

const patientRouter = Router();

patientRouter.post("/signup", validateSchemma(patientSchemma), patientController.create)
patientRouter.post("/signin", patientController.signin)

export default patientRouter;