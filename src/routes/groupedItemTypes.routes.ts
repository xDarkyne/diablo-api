import { Router, Response, Request } from 'express';
import { CustomItemTypesController } from '../controllers';

const GroupedItemTypesRouter = Router();

GroupedItemTypesRouter.get('/:region/:locale/v1/item-types/', (req: Request, res: Response) => CustomItemTypesController.getGroupedItemTypeIndex(req, res));
GroupedItemTypesRouter.get('/:region/:locale/v1/item-types/:type', (req: Request, res: Response) => CustomItemTypesController.getGroupedItemType(req, res));
GroupedItemTypesRouter.get('/:region/:locale/v1/items-all/', (req: Request, res: Response) => CustomItemTypesController.getAllItemTypes(req, res));

export = GroupedItemTypesRouter;