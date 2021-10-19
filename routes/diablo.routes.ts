import { Router, Response, Request, NextFunction } from 'express';
import { DiabloController } from '../controllers/diablo.controller';

const DiabloRouter = Router();

DiabloRouter.get('/hello', (req: Request, res: Response,) => {
    res.send("<p>Hello World</p>");
});

DiabloRouter.get('/item-types', (req, res) => DiabloController.getItemTypeIndex(req, res))
DiabloRouter.get('/item-types/:type', (req, res) => DiabloController.getItemType(req, res))
DiabloRouter.get('/items/:item', (req, res) => DiabloController.getItem(req, res))

export = DiabloRouter;