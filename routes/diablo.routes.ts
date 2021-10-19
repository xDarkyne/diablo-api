import { Router, Response, Request, NextFunction } from 'express';
import { DiabloController } from '../controllers/diablo.controller';

const DiabloRouter = Router();

DiabloRouter.get('/hello', (req: Request, res: Response,) => {
    res.send("<p>Hello World</p>");
});

DiabloRouter.get('/token', DiabloController.getSeasonIndex)

export = DiabloRouter;