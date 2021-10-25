import { Router, Response, Request } from 'express';
import { ItemController } from '../controllers';

const ItemRouter = Router();

ItemRouter.get('/:region/:locale/item/:item', (req: Request, res: Response) => ItemController.getItem(req, res));

export = ItemRouter;