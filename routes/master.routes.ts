import { Router } from 'express';
import DiabloRouter from './diablo.routes'

const Routes = Router();

Routes.use("/api/v1", DiabloRouter)

export = Routes;