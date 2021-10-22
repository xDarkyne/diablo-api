import { Router } from 'express';
import DiabloRouter from './diablo.routes'

const Routes = Router();

Routes.use(DiabloRouter);

export = Routes;