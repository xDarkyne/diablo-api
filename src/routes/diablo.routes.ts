import { Router, Response, Request } from 'express';
import { ItemTypeController, ItemController } from '../controllers';

const DiabloRouter = Router();

/**
 * Blizzard Vanilla Endpoints
 */
DiabloRouter.get('/:locale/item-types', (req: Request, res: Response) => ItemTypeController.getItemTypeIndex(req, res));
DiabloRouter.get('/:locale/item-types/:type', (req: Request, res: Response) => ItemTypeController.getItemType(req, res));

DiabloRouter.get('/:locale/item/:item', (req: Request, res: Response) => ItemController.getItem(req, res));

/**
 * Custom Endpoints
 */
DiabloRouter.get('/:locale/v1/item-types/:type', (req: Request, res: Response) => ItemTypeController.getGroupedItemType(req, res));
DiabloRouter.get('/:locale/v1/items-all/', (req: Request, res: Response) => ItemTypeController.getAllItemTypes(req, res));

export = DiabloRouter;