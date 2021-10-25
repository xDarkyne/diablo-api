import { Router, Response, Request } from 'express';
import { ItemTypesController } from '../controllers';

const ItemTypeRouter = Router();

ItemTypeRouter.get('/:region/:locale/item-types', (req: Request, res: Response) => ItemTypesController.getItemTypeIndex(req, res));
ItemTypeRouter.get('/:region/:locale/item-types/:type', (req: Request, res: Response) => ItemTypesController.getItemType(req, res));

export = ItemTypeRouter;