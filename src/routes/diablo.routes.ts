import { Router, Response, Request, NextFunction } from 'express';
import { ItemTypeController, ItemController } from '../controllers';

const DiabloRouter = Router();

DiabloRouter.get('/hello', (req: Request, res: Response,) => {
    res.send("<p>Hello World</p>");
});

DiabloRouter.get('/item-types', (req, res) => ItemTypeController.getItemTypeIndex(req, res));
DiabloRouter.get('/item-types/:type', (req, res) => ItemTypeController.getItemType(req, res));

DiabloRouter.get('/item/:item', (req, res) => ItemController.getItem(req, res));

export = DiabloRouter;