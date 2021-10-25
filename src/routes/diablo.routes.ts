import { Router, Response, Request } from 'express';
import { ItemTypeController, ItemController } from '../controllers';

const DiabloRouter = Router();

/**
 * Blizzard Vanilla Endpoints
 */
DiabloRouter.get('/:region/:locale/item-types', (req: Request, res: Response) => ItemTypeController.getItemTypeIndex(req, res));
DiabloRouter.get('/:region/:locale/item-types/:type', (req: Request, res: Response) => ItemTypeController.getItemType(req, res));

DiabloRouter.get('/:region/:locale/item/:item', (req: Request, res: Response) => ItemController.getItem(req, res));

/**
 * Custom Endpoints
 */
DiabloRouter.get('/:region/:locale/v1/item-types/', (req: Request, res: Response) => ItemTypeController.getGroupedItemTypeIndex(req, res));
DiabloRouter.get('/:region/:locale/v1/item-types/:type', (req: Request, res: Response) => ItemTypeController.getGroupedItemType(req, res));
DiabloRouter.get('/:region/:locale/v1/items-all/', (req: Request, res: Response) => ItemTypeController.getAllItemTypes(req, res));

export = DiabloRouter;